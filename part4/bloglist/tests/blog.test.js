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
