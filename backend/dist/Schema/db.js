import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        set: function (value) {
            if (!value)
                return value;
            return value
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        default: ""
    }
});
const subjectSchema = new mongoose.Schema({
    subject: {
        type: String, // to-do => Make site say (subject already exists) if the has already created one with same name(probably check => unique: true)
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }
});
export const userModel = mongoose.model("User", userSchema);
export const subjectModel = mongoose.model("Subject", subjectSchema);
export const noteModel = mongoose.model("Notes", noteSchema);
//# sourceMappingURL=db.js.map