import express from 'express'
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../controllers/posts.controller.js';
import authenticate from '../middleware/authMiddelware.js';
const router = express.Router();

router.route("/").post(authenticate, createPost).get(authenticate, getAllPosts)
router.route("/:id").patch(authenticate, updatePost)
router.route("/:id").delete(authenticate, deletePost)

//
router.route("/:id").get(authenticate, getPostById)

export default router;