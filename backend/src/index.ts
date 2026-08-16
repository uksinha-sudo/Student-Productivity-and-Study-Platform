// let arr = [1, 2, 3, 4, 5];
// console.log(arr);
// arr.push(6);
// console.log(arr);
// arr.pop();
// console.log(arr);
// arr.shift(); // removes the first element
// console.log(arr);
// arr.unshift(0); // adds an element to the beginning
// console.log(arr);
// arr.splice(2, 1); // removes an element at a specific index
// console.log(arr);
// arr.slice(2, 4); // returns a new array with the elements from the start index to the end index
// console.log(arr);

import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import mongoose from "mongoose";
import { userRouter } from "./routes/userRoute.js";
import { subjectRouter } from "./routes/subjectRoute.js";
const app = express();
app.use(express.json());
app.use(cors());

// all the routes connections
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subject", subjectRouter);


//connection to database

async function connectToDB() {
    const mongo_url = process.env.MONGO_URL;
    const port = process.env.PORT;
    if (!mongo_url) {
        throw new Error("Couldn't find MONGO DB URL");
    }
    try {
        await mongoose.connect(mongo_url);
        app.listen(port, () => {
            console.log(`Connected to Database, Listening on Port ${port}`)
        });
    } catch (error) {
        return console.log(error)
    }
}
connectToDB();