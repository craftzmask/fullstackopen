const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 });
  return response.json(blogs);
});

router.post("/", async (request, response) => {
  const users = await User.find({});
  const blog = new Blog({
    user: users[0],
    ...request.body
  });
  const savedBlog = await blog.save();
  return response.status(201).json(savedBlog);
});

router.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findByIdAndUpdate(id, request.body, { new: true });
  return response.json(blog);
});

module.exports = router;
