const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    time: Date,
    to: String,
    from: String,
    content: String
});

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    messages: [MessageSchema],
    role: String,
    status: Boolean,
    posts: [String],
    phone: String,
    description: String
});

module.exports = mongoose.model("User", UserSchema);