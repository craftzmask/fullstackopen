const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy return one", () => {
  const result = listHelper.dummy([]);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("0 blogs equals 0", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("1 blog equals to that blog's likes", () => {
    const blogs = listHelper.blogs.slice(0, 1);
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, blogs[0].likes);
  });

  test("blogs equals their likes sum", () => {
    const sum = listHelper.blogs.reduce((sum, blog) => sum + blog.likes, 0);
    const result = listHelper.totalLikes(listHelper.blogs);
    assert.strictEqual(result, sum);
  });
});

describe("favorite blog", () => {
  test("0 blogs equals null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("1 blog equals to that blog itself", () => {
    const blogs = listHelper.blogs.slice(0, 1);
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[0]);
  });

  test("blogs equals the most likes blog", () => {
    const result = listHelper.favoriteBlog(listHelper.blogs);
    assert.deepStrictEqual(result, {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("most blogs", () => {
  test("0 blogs equals null", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });

  test("1 blog equals to that blog itself", () => {
    const blogs = listHelper.blogs.slice(0, 1);
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: blogs[0].author,
      blogs: 1,
    });
  });

  test("blogs equals the most likes blog", () => {
    const result = listHelper.mostBlogs(listHelper.blogs);
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
