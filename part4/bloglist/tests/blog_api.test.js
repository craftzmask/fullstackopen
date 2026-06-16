const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
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

after(async () => {
  await mongoose.connection.close();
});
