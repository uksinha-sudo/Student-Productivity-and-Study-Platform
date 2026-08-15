// all the user related CRUD operations here in this TS file
import { Router } from "express";
import bcrypt from 'bcrypt';
import { userModel } from "../Schema/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
            return res.status(402).json({
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
        });
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
            id: existingUser._id.toString()
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
//# sourceMappingURL=userRoute.js.map