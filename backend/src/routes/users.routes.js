import express from 'express'
import { allUsers, getLoggedInUserPosts, loginUser, registerUser } from '../controllers/users.controller.js';
import authenticate from '../middleware/authMiddelware.js';

const router = express.Router()

router.route("/").post(registerUser)
router.route("/auth").post(loginUser)
router.route("/get-posts/:id").get(authenticate, getLoggedInUserPosts)
export default router;