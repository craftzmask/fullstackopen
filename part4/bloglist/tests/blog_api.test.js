const assert = require("node:assert");
const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("../utils/list_helper");
const app = require("../app");

const api = supertest(app);

const testUser = {
  username: "testuser1",
  name: "Test User",
  password: "password",
};

let userResponse;

beforeEach(async () => {
  await Blog.deleteMany({});
  const promises = helper.blogs.map((blog) => new Blog(blog).save());
  await Promise.all(promises);

  await User.deleteMany({});
  await api
    .post("/api/users")
    .send(testUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  await api
    .post("/api/users")
    .send({ username: "test", password: "test", name: "test" })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  userResponse = await api
    .post("/api/login")
    .send(testUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

describe("Blog API", () => {
  test("blogs can be retrieved", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.blogs.length);
  });

  test("each blog has an id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      assert.strictEqual(typeof blog.id, "string");
      assert.strictEqual(typeof blog._id, "undefined");
    });
  });

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "https://test.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${userResponse.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.blogs.length + 1);

    const titles = response.body.map((blog) => blog.title);
    assert(titles.includes("Test Blog"));
  });

  test("likes is 0 by default", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "https://test.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${userResponse.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test("title and url are required", async () => {
    const newBlog = {
      author: "Test Author",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${userResponse.body.token}`)
      .expect(400);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.blogs.length);
  });

  test("delete a blog by its id", async () => {
    // User login
    const author = await api
      .post("/api/login")
      .send(testUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // User create a new blog
    const blog = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${author.body.token}`)
      .send({
        title: "Test Blog",
        author: "Test Author",
        url: "https://test.com",
        likes: 5,
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await Blog.find({});
    const blogToDelete = blog.body;

    // Someone else login
    const other = await api
      .post("/api/login")
      .send({
        username: "test",
        password: "test",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // someone try to remove blog
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${other.body.token}`)
      .expect(401);

    // Author removes blog
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${author.body.token}`)
      .expect(204);

    const updatedBlogs = await Blog.find({});
    assert.strictEqual(updatedBlogs.length, blogs.length - 1);

    assert(!updatedBlogs.some((blog) => blog.id === blogToDelete.id));
  });

  test("a blog can be liked", async () => {
    const blogs = await Blog.find({});
    const blogToLike = blogs[0];

    await api
      .put(`/api/blogs/${blogToLike.id}`)
      .send({ likes: blogToLike.likes + 1 })
      .expect(200);

    const updatedBlog = await Blog.findById(blogToLike.id);
    assert.strictEqual(updatedBlog.likes, blogToLike.likes + 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
