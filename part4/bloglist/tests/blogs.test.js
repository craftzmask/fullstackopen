const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLike([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLike(listWithOneBlog);
    assert.strictEqual(result, listWithOneBlog[0].likes);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLike(listHelper.blogs);
    assert.strictEqual(result, 36);
  });
});

describe("favoriteBlog ", () => {
  test("of empty list is zero", () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(listHelper.blogs);
    assert.deepStrictEqual(result, listHelper.blogs[2]);
  });
});

describe("mostBlogs", () => {
  test("of empty list is null", () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostBlogs(listHelper.blogs);
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("mostLikes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.mostLikes([]);
    assert.deepStrictEqual(result, null);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(listHelper.blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
