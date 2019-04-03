const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    email: String,
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