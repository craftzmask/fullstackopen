const assert = require("node:assert");
const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("../utils/list_helper");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const promises = helper.blogs.map((blog) => new Blog(blog).save());
  await Promise.all(promises);
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

    const response = await api
      .post("/api/blogs")
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

    await api.post("/api/blogs").send(newBlog).expect(400);
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.blogs.length);
  });

  test("delete a blog by its id", async () => {
    const blogs = await Blog.find({});

    const blogToDelete = blogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

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
