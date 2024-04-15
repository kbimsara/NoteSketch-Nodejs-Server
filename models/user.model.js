const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Name Field!!"],
        },
        email: {
            type: String,
            required: [true, "Please Enter Email Field!!"],
        },
        pw: {
            type: String,
            required: [true, "Please Enter Password Field!!"],
        }
    },
    {
        timestamp: true,
    }
);

const User = mongoose.model("users", UserSchema);
module.exports = User;