// All the subject related CRUD here

import { Router } from 'express';
import authMiddleware from '../middleware.js';
import { subjectModel } from '../Schema/db.js';
import mongoose from 'mongoose';
export const subjectRouter = Router();

subjectRouter.post("/addSubject", authMiddleware, async(req, res) => {
    const subject = req.body.subject;
    const userId = new mongoose.Types.ObjectId(req.userId);
    try{

        const existingSubject = await subjectModel.findOne({
            subject,
        });
        
        if(existingSubject){
            return res.status(409).json({
                message:"Subject already listed"
            });
        };
        
        const newSubect = await subjectModel.create({
            subject,
            userId
        })
        
        res.status(200).json({
            message:"Subject Added",
            newSubect
        })
    } catch(err){
        return res.status(500).json({message:""})
    }
    

});

subjectRouter.get("/subjectsBulk", authMiddleware, async(req, res) => {

    const userId = new mongoose.Types.ObjectId(req.userId);

    try{

        const allSubjects = await subjectModel.find({
            userId
        });
        
        if(allSubjects.length === 0) {
            return res.status(404).json({message:"couldn't find any"})
        }
        
        res.json({
            allSubjects
        })
    } catch(error){
        return res.status(500).json({message:"Internal server error, failed to get subjects"})
    }
});

subjectRouter.get("/subject/:subjectId", authMiddleware, async(req, res) => {
    const subjectId = req.params.subjectId;

    try{

        const subject = await subjectModel.findOne({
            _id: subjectId
        });
        
        if(!subject){
            return res.status(404).json({
                message: "Couldn't find subject"
            });
        }
        
        res.status(200).json({
            subject
        });
        
    } catch(error){
        return res.status(500).json({message:"Internal server error, couldn't find subject"})
    }

});

subjectRouter.put("/update/:subjectId", authMiddleware, async(req, res) => {

    const subjectId = req.params.subjectId;
    const subject = req.body.subject;

    const findSubject = await subjectModel.findById({_id: subjectId});
    if(!findSubject){
        return res.status(404).json({
            message:"Subject not found"
        })
    }

    const updatedSubject = await subjectModel.findByIdAndUpdate(
        {_id: subjectId},
        {subject},
        {returnDocument: 'after'}
    );

    res.status(200).json({
        message:"Updated Subject",
        updatedSubject
    });
});

subjectRouter.delete("/delete/:subjectId", authMiddleware, async(req, res) => {
    const subjectId = req.params.subjectId;

    try{
        
        const findSubject = await subjectModel.findById({_id: subjectId});
        
        if(!findSubject){
            return res.status(404).json({
                message:"Couldn't find subject"
            })
        };
        
        await subjectModel.findByIdAndDelete({_id:subjectId});
        
        res.status(200).json({message:"Deleted Subject"})
    } catch(error){
        return res.status(500).json({message:"Internal server error, failed to delete subject"})
    }

});