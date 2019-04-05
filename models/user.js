const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const MessageSchema = new mongoose.Schema({
	to: String,
	from: String,
	content: String,
	isStarred: Boolean,
	date: Date,
	title: String,
	isRead: Boolean
});

const UserSchema = new mongoose.Schema({
	name: String,
	password: {
		type: String,
		required: true,
		minlength: 5
	},
	email: {
		type: String,
		//mongoose schema attribute required
		required: true,
		minlength: 5,
		trim: true, // trim whitespace
		unique: true
	},
	//array of message id
	messages: [MessageSchema],
	isBuyer: Boolean,
	isBanned: Boolean,
	// //array of post id
	// posts: [String],
	phone: String,
	description: String,
	orderInfo: {
		twoMonthTotal: Number,
		activeNum: Number,
		finishedNum: Number,
		postedNum: Number
	},
	icon: String
});

// Our own student finding function 
// UserSchema.statics.findByNamePassword = function (name, password) {
// 	const User = this

// 	return User.findOne({
// 		name: name
// 	}).then((user) => {
// 		if (!user) {
// 			console.log('not user')
// 			return Promise.reject()
// 		}

// 		return new Promise((resolve, reject) => {
// 			bcrypt.compare(password, user.password, (error, result) => {
// 				if (result) {
// 					resolve(user);
// 				} else {
// 					console.log('fail password')
// 					reject();
// 				}
// 			})
// 		})
// 	})
// }

// This function runs before saving/modifying user to database
// UserSchema.pre('save', function (next) {
// 	const user = this

// 	if (user.isModified('password')) {
// 		bcrypt.genSalt(10, (error, salt) => {
// 			bcrypt.hash(user.password, salt, (error, hash) => {
// 				user.password = hash
// 				next()
// 			})
// 		})
// 	} else {
// 		next()
// 	}

// })
UserSchema.statics.findByNamePassword = function (name, password) {
	const User = this

	return User.findOne({
		name: name
	}).then((user) => {
		if (!user) {
			console.log('not user')
			return Promise.reject()
		}

		return new Promise((resolve, reject) => {
			if (password == user.password) {
				resolve(user);
			}
			else {
				reject()
			}
		})
	})
}




module.exports = mongoose.model("User", UserSchema);