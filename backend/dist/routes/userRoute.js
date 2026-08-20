// all the user related CRUD operations here in this TS file
import { Router } from "express";
import bcrypt from 'bcrypt';
import { subjectModel, userModel } from "../Schema/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authMiddleware from "../middleware.js";
import mongoose from "mongoose";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const userRouter = Router();
userRouter.post("/signup", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;
    try {
        const existingUser = await userModel.findOne({
            email
        });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already in use"
            });
        }
        ;
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            username, email, password: hashedPassword, avatar
        });
        res.status(200).json({
            message: "Account Created"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server error, Failed to create account"
        });
    }
    ;
});
userRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const existingUser = await userModel.findOne({
            email
        }).select("+password");
        if (!existingUser) {
            return res.status(404).json({
                messsage: "User not found"
            });
        }
        ;
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(401).json({
                message: "Incorrect Credentials"
            });
        }
        ;
        if (JWT_SECRET === undefined) {
            console.log("JWT Secret can't be undefined");
            return;
        }
        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_SECRET);
        res.json({
            message: "User logged in",
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error, failed to login"
        });
    }
});
userRouter.get("/profile", authMiddleware, async (req, res) => {
    try {
        const profile = await userModel.findOne({
            _id: req.userId
        });
        res.status(200).json({
            message: "Welcome",
            profile
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error, failed to find your profile" });
    }
});
userRouter.put("/update", authMiddleware, async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;
    try {
        const user = await userModel.findById(req.userId).select("+password");
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        const hashedPassword = await bcrypt.hash(password, user.password);
        const updatedUser = await userModel.findByIdAndUpdate(req.userId, {
            username,
            email,
            password: hashedPassword,
            avatar
        }, {
            new: true
        }).select("-password");
        res.status(200).json({
            message: "User information updated",
            updatedUser
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error, failed to update information" });
    }
});
userRouter.delete("/delete", authMiddleware, async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.userId);
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        await subjectModel.deleteMany({
            userId: new mongoose.Types.ObjectId(req.userId)
        });
        res.status(200).json({ message: "Account Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error, failed to delete account" });
    }
});
//# sourceMappingURL=userRoute.js.map