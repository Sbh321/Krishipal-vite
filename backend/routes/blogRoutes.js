import express from "express";
const router = express.Router();
import {
  getLatestBlogs,
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

// Route definitions
router.route("/latest").get(getLatestBlogs);
router.route("/").get(getBlogs).post(protect, createBlog);
router
  .route("/:id")
  .get(checkObjectId, getBlogById)
  .put(protect, checkObjectId, updateBlog)
  .delete(protect, checkObjectId, deleteBlog);
router.route("/:id/comments").post(checkObjectId, protect, createComment);

export default router;
