const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please Enter Title Field!!"],
        },
        des: {
            type: String,
            required: [true, "Please Enter Description Field!!"],
        },
        email: {
            type: String,
            required: [true, "Please Enter Email Field!!"],
        }
    },
    {
        timestamp: true,
    }
);

const Note = mongoose.model("notes", NoteSchema);
module.exports = Note;