import dbConfig from "../config/db.config.js";
import { posts } from "../models/associations.js";
import { users } from "../models/associations.js";
import createToken from '../utils/createToken.js'
import bcrypt from 'bcrypt'


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: "all fields are required" })
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const user = users.create({
            username: username,
            email: email,
            password: hashedPassword,
        })


        if (user) {
            res.status(201).json({
                success: true,
                token: createToken(res, user.id),
                message: "User created successfully"
            })
        } else {
            res.status(404).json({ message: "Error creating user" })
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await users.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }
        const { password: _, ...userData } = user.toJSON();

        return res.status(200).json({
            message: "User login successfully",
            token: createToken(res, user.id),
            user: userData
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};


const allUsers = async (req, res) => {
    try {
        const user = await users.findAll({ include: [posts] })
        res.status(200).json({ message: "user Fetched successfully", data: { user } })
    } catch (e) {
        res.status(500).json({ message: "Something went wrong in server" })
    }
}

const getLoggedInUserPosts = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await users.findOne({
            where: { id },
            include: [posts]
        })

        if (!user) {
            res.status(400).json({ message: "User not found" })
        } else {
            res.status(200).json({
                success: true,
                message: "User with created posts",
                data: {
                    user
                }
            })
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong in server" })
    }
}

export { registerUser, allUsers, loginUser, getLoggedInUserPosts }
