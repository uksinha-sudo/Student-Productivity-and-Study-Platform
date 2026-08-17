import { Router } from 'express';
import authMiddleware from '../middleware.js';
import { noteModel, subjectModel } from '../Schema/db.js';
import mongoose from 'mongoose';
export const noteRouter = Router();
noteRouter.post("/create/:subjectId", authMiddleware, async (req, res) => {
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
        }
        ;
        const createNote = await noteModel.create({
            title,
            description,
            subjectId
        });
        res.status(201).json({
            message: "Note created",
            note: createNote
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
noteRouter.get("/note/:noteId", authMiddleware, async (req, res) => {
    const noteId = req.params.noteId;
    try {
        const note = await noteModel.findById({ _id: noteId });
        if (!note) {
            return res.status(404).json({ message: "Couln't find note" });
        }
        res.status(200).json({
            note
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error, failed to fetch note" });
    }
    ;
});
noteRouter.get("/notes/:subjectId", authMiddleware, async (req, res) => {
    const subjectId = req.params.subjectId;
    try {
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
        }
        ;
        const notes = await noteModel.find({
            subjectId
        });
        if (!notes) {
            return res.status(404).json({ message: "Couldn't find notes" });
        }
        ;
        res.status(200).json({
            notes
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error, failed to fetch Notes" });
    }
    ;
});
noteRouter.put("/update/:noteId", authMiddleware, async (req, res) => {
    const noteId = req.params.noteId;
    const title = req.body.title;
    const description = req.body.description;
    try {
        const findNote = await noteModel.findById({ _id: noteId });
        if (!findNote) {
            return res.status(404).json({ message: "Couldn't find note" });
        }
        ;
        const updatedNote = await noteModel.findOneAndUpdate({ _id: noteId }, { title, description }, { returnDocument: 'after' });
        res.status(200).json({
            message: "Updated Note",
            updatedNote
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error, failed to update note" });
    }
    ;
});
noteRouter.delete("/delete/:noteId", authMiddleware, async (req, res) => {
    const noteId = req.params.noteId;
    const findNote = await noteModel.findById({ _id: noteId });
    if (!findNote) {
        return res.status(404).json({ message: "Couldn't Find note" });
    }
    ;
    const deletedNote = await noteModel.findOneAndDelete({ _id: noteId });
    res.status(200).json({
        message: "Deleted Successfully!"
    });
});
//# sourceMappingURL=noteRoute.js.map