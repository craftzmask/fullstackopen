const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  return response.json(blogs);
});

router.post("/", userExtractor, async (request, response) => {
  const blog = new Blog({
    user: request.user._id,
    ...request.body,
  });
  const savedBlog = await blog.save();
  return response.status(201).json(savedBlog);
});

router.delete("/:id", userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);
  if (blogToDelete.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({
      error: "Unauthorized",
    });
  }

  await Blog.findByIdAndDelete(request.params.id);

  return response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findByIdAndUpdate(id, request.body, { new: true });
  return response.json(blog);
});

module.exports = router;
