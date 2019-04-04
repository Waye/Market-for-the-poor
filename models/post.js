const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/post");

const PostSchema = new mongoose.Schema({
    name: String,
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

const Post = mongoose.model('Post',  PostSchema);
const post = new Post({
	name: 'User1',
	type: 'request',
	date: new Date(2018, 11, 31),
	title: 'Frozen Vegetables',
	description:  'Mix of 10 kinds of vegetables. Frozen and packaged safely. Easy to Cook while good in taste. Initial request of 10kg is made. After first purchase, we are willing to make ongoing, continuous orders if the quality of the product is approved.',
	quantity: '10 kg',
	price: 100,
	image: '/img/frozen_veg.png',
	completed: true,
	dueDate: new Date(2019, 1, 6),
	category: 'Food'
});

post.save(function(error) {
    console.log("Post data has been saved!");
	if (error) {
    	console.error(error);
	}
});

module.exports = mongoose.model("Post", PostSchema);