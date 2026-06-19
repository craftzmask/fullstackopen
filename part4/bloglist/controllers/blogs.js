const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

router.post("/", async (request, response) => {
  const blog = new Blog(request.body);
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
