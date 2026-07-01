import express from 'express'
import { createPost, deletePost, getAllPosts, updatePost } from '../controllers/posts.controller.js';
import authenticate from '../middleware/authMiddelware.js';
const router = express.Router();

router.route("/").post(authenticate, createPost).get(authenticate, getAllPosts)
router.route("/:id").patch(authenticate, updatePost)
router.route("/:id").delete(authenticate, deletePost)

export default router;