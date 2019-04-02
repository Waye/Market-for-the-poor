const mongoose = require("mongoose");
const validator = require('validator')
const bcrypt = require('bcryptjs')

const MessageSchema = new mongoose.Schema({
    time: Date,
    to: String,
    from: String,
    content: String
});

const UserSchema = new mongoose.Schema({
    name: String,
    password:  {
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
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email'
		}
    },
    //array of message id
    messages: [MessageSchema],
    isBuyer: Boolean,
    status: Boolean,
    //array of post id
    posts: [String],
    phone: String,
    description: String,
    orderInfo: {
        twoMonthTotal : Number,
        activeNum : Number,
        finishedNum : Number,
        postedNum : Number
    }
});

// Our own student finding function 
UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this

	return User.findOne({email: email}).then((user) => {
		if (!user) { 
			return Promise.reject()
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (error, result) => {
				if (result) {
					resolve(user);
				} else {
					reject();
				}
			})
		})
	})
}

// This function runs before saving/modifying user to database
UserSchema.pre('save', function(next) {
	const user = this

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(user.password, salt, (error, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}

})


module.exports = mongoose.model("User", UserSchema);