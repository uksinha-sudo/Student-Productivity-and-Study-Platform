// All the notes related CRUD here 
import type{ Request, Response } from "express";
import { Router } from 'express';
import authMiddleware from '../middleware.js';
import { noteModel, subjectModel } from '../Schema/db.js';
import mongoose from 'mongoose';
export const noteRouter = Router();

noteRouter.post(
    "/create/:subjectId",
    authMiddleware,
    async (req: Request<{ subjectId: string }>, res: Response) => {
        try {
            const { title, description } = req.body;
            const { subjectId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(subjectId)) {
                return res.status(400).json({
                    message: "Invalid subject ID"
                });
            }

            const getSubject = await subjectModel.findOne({
                _id: subjectId,
                userId: new mongoose.Types.ObjectId(req.userId)
            });

            if (!getSubject) {
                return res.status(404).json({
                    message: "Subject not found"
                });
            };

            const createNote = await noteModel.create({
                title,
                description,
                subjectId
            });

            res.status(201).json({
                message: "Note created",
                note: createNote
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
);