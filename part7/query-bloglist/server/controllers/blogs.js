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
  const user = request.user;
  const blog = new Blog({
    user: user._id,
    ...request.body,
  });
  const savedBlog = await blog.save();

  user.blogs.push(savedBlog._id);
  const savedUser = await user.save();

  savedBlog.user = savedUser;

  return response.status(201).json(savedBlog);
});

router.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;

  const blogId = request.params.id;
  const blogToDelete = await Blog.findById(blogId);
  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).json({
      error: "Unauthorized",
    });
  }

  user.blogs = user.blogs.filter((id) => id.toString() !== blogId);
  await user.save();

  await Blog.findByIdAndDelete(blogId);

  return response.status(204).end();
});

router.put("/:id", async (request, response) => {
  console.log(request.body);
  const { id } = request.params;
  const blog = await Blog.findByIdAndUpdate(id, request.body, {
    new: true,
  }).populate("user", { blogs: 0 });
  return response.json(blog);
});

module.exports = router;
