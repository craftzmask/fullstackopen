const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");
const User = require("../models/user");
const listHelper = require("../utils/list_helper");

const api = supertest(app);

const blogURI = "/api/blogs";

const rootUser = {
  username: "root",
  password: "root",
};

const normalUser = {
  username: "normal",
  password: "normal",
};

beforeEach(async () => {
  await User.deleteMany({});

  const savedUser = await User.create({
    username: rootUser.username,
    passwordHash: await bcrypt.hash(rootUser.password, 10),
  });

  await User.insertOne({
    username: normalUser.username,
    passwordHash: await bcrypt.hash(normalUser.password, 10),
  });

  await Blog.deleteMany({});
  const blogPromises = listHelper.blogs.map((b) => {
    const blog = new Blog(b);
    blog.user = savedUser._id;
    return blog.save();
  });

  await Promise.all(blogPromises);
});

test("return correct number of blogs", async () => {
  const res = await api
    .get(blogURI)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(listHelper.blogs.length, res.body.length);
});

test("each blog has its own id", async () => {
  const res = await api
    .get(blogURI)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  res.body.forEach((blog) =>
    assert.strictEqual(blog.hasOwnProperty("id"), true)
  );
});

test("a valid blog can be added", async () => {
  const user = await login(rootUser);

  await api
    .post(blogURI)
    .send({
      title: "Atomic CSS Modules",
      author: "Michele Bertoli",
      url: "https://medium.com/@michelebertoli",
      likes: 100,
    })
    .set("Authorization", `Bearer ${user.token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await listHelper.blogsInDb();
  assert.strictEqual(blogs.length, listHelper.blogs.length + 1);
  assert(blogs.map((b) => b.title).includes("Atomic CSS Modules"));
});

test("likes default to 0 if missing", async () => {
  const user = await login(rootUser);

  const res = await api
    .post(blogURI)
    .send({
      title: "Atomic CSS Modules",
      author: "Michele Bertoli",
      url: "https://medium.com/@michelebertoli",
    })
    .set("Authorization", `Bearer ${user.token}`)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(res.body.hasOwnProperty("likes"), true);
  assert.strictEqual(res.body.likes, 0);
});

test("cannot add without name or url", async () => {
  const user = await login(rootUser);

  await api
    .post(blogURI)
    .send({
      author: "Michele Bertoli",
      url: "https://medium.com/@michelebertoli",
    })
    .set("Authorization", `Bearer ${user.token}`)
    .expect(400);

  await api
    .post(blogURI)
    .send({
      title: "Atomic CSS Modules",
      author: "Michele Bertoli",
    })
    .set("Authorization", `Bearer ${user.token}`)
    .expect(400);

  const blogs = await listHelper.blogsInDb();
  assert.strictEqual(blogs.length, listHelper.blogs.length);
});

test("delete a valid blog", async () => {
  const user = await login(rootUser);
  const blogsAtStart = await listHelper.blogsInDb();

  await api
    .delete(`${blogURI}/${blogsAtStart[0].id}`)
    .set("Authorization", `Bearer ${user.token}`)
    .expect(204);

  const blogsAtEnd = await listHelper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert(!titles.includes(blogsAtStart[0].title));
});

test("only author can delete his/her own blogs", async () => {
  const user = await login(normalUser);
  const blogsAtStart = await listHelper.blogsInDb();

  await api
    .delete(`${blogURI}/${blogsAtStart[0].id}`)
    .set("Authorization", `Bearer ${user.token}`)
    .expect(401);

  const blogsAtEnd = await listHelper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);

  const titles = blogsAtEnd.map((b) => b.title);
  assert(titles.includes(blogsAtStart[0].title));
});

test("like a valid blog", async () => {
  const blogsAtStart = await listHelper.blogsInDb();

  const res = await api
    .put(`${blogURI}/${blogsAtStart[0].id}`)
    .send({ ...blogsAtStart[0], likes: blogsAtStart[0].likes + 1 })
    .expect(200);

  assert.strictEqual(res.body.likes, blogsAtStart[0].likes + 1);
});

const login = async (user) => {
  const res = await api
    .post("/api/login")
    .send(user)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  return res.body;
};

after(() => {
  mongoose.connection.close();
});
