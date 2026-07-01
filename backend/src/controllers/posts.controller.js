import { users } from '../models/associations.js';
import { posts } from '../models/associations.js'

const createPost = async (req, res) => {
    try {
        const { title, desc, creatorId } = req.body;

        if (!title || !desc) {
            res.status(400).json({ message: "All fields are required" })
        }

        const post = posts.create({
            title: title,
            desc: desc,
            creatorId: creatorId
        })

        if (post) {
            res.status(201).json({ message: "Post created Successfully", post })
        } else {
            res.status(400).json({ message: "Post does not created" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in server" })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const Posts = await posts.findAll({ include: [users] })
        res.status(200).json({ message: "All posts fetched Successfully", Posts })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in server" })

    }
}

const updatePost = async (req, res) => {
    try {
        const post = await posts.findByPk(req.params.id)

        if (!post) {
            res.status(404).json({ message: "Post not found" })
        } else {
            await post.update({ ...req.body })

            res.status(200).json({ message: "Post update Successfully", post })
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await posts.findByPk(req.params.id)

        if (!post) {
            res.status(404).json({ message: "Post not found" })
        } else {
            await posts.destroy({ where: { id: post.id } })

            res.status(200).json({ message: "Post deleted Successfully" })

        }


    } catch (error) {
        res.status(500).json({ message: "Server error" })

    }
}

export { createPost, getAllPosts, updatePost, deletePost }