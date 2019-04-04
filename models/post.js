const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/post");

const PostSchema = new mongoose.Schema({
	userId: String,
	userName: String,
    type: String,
	date: Date,
	title: String,
	description: String,
	quantity: String,
	price: Number,
	image: String,
	completed: Boolean,
	dueDate: Date,
	category: String
});

module.exports = mongoose.model("Post", PostSchema);