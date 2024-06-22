import asyncHandler from "../middleware/asyncHandler.js";
import Blog from "../models/blogModel.js";

// @desc Fetch 3 latest blogs
// @route GET /api/blogs/latest
// @access Public
const getLatestBlogs = asyncHandler(async (req, res) => {
  console.log("reached here");

  const blogs = await Blog.find({})
    .sort({ createdAt: -1 }) // Sort in descending order by createdAt field
    .limit(3); // Limit the result to 3 blogs
  res.json(blogs);
});

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// @desc    Fetch single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private/Admin (example)
const createBlog = asyncHandler(async (req, res) => {
  const { image, title, description } = req.body;

  // Basic validation
  if (!image || !title || !description) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const blog = new Blog({
    image,
    title,
    description,
    user: req.user._id, // Assuming user ID is available in req.user from authentication middleware
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update an existing blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin (example)
const updateBlog = asyncHandler(async (req, res) => {
  const { image, title, description } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.image = image || blog.image;
    blog.title = title || blog.title;
    blog.description = description || blog.description;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc    Delete an existing blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin (example)
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne({ _id: blog._id });
    res.json({ message: "Blog removed" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc    Create a comment on a blog
// @route   POST /api/blogs/:id/comments
// @access  Public (example)
const createComment = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const { comment } = req.body;

    const alreadyCommented = blog.comments.find(
      (c) => c.user.toString() === req.user._id.toString()
    );

    if (alreadyCommented) {
      res.status(400);
      throw new Error("You have already commented on this blog post");
    }

    const newComment = {
      name: req.user.name,
      comment,
      user: req.user._id,
      createdAt: Date.now(),
    };

    blog.comments.push(newComment);

    await blog.save();
    res.status(201).json({ message: "Comment added" });
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});

export {
  getLatestBlogs,
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
};
