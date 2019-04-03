const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client
const session = require('express-session')
const ejs = require('ejs')
const fs = require('fs')

const cookieParser = require('cookie-parser')
const { ObjectID } = require('mongodb')

// Import mongoose connection
const { mongoose } = require('./db/mongoose')

// Import the models
require('./models/user')
require('./models/admin')
require('./models/post')
require('./models/order')
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const Post = mongoose.model('Post');
const Order = mongoose.model('Order');


// express
const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());
// parse incoming parameters to req.body
app.use(bodyParser.urlencoded({ extended:true }))
// static directory for js/css/html
app.use(express.static(__dirname + '/public'))
// set the view library
app.set('view engine', 'ejs')

app.use(cookieParser())

// Add express sesssion middleware
app.use(session({
	name: 'test',
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	// cookie: {
	// 	maxAge: 3600000,
	// 	httpOnly: true
	// }
}))

// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
	if (!req.session.user) {
		res.redirect('/login')
	} else {
		next();
	}
}

const loginChecker = (req, res, next) => {
	if (!req.session.user) {
		next();
	} else if (req.session.user.email == "admin@gmail.com") {
		res.redirect('/adminpage');
	} else {
		res.redirect('/feedpage');
	}
}

// Middleware for authentication for resources
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.redirect('/login')
		})
	} else {
		res.redirect('/login')
	}
}


app.route('/login')
	.get(loginChecker, (req, res) => {
		// console.log(req.session.user)
		console.log('get for login')
		res.render('login');	
	})
	.post((req, res) => {
	const email = req.body.uemail;
	const password = req.body.psw;
	Admin.findByEmailPassword(email, password).then(
	(admin) => {
		console.log('admin')
		// console.log(admin)
		req.session.user = admin
		res.redirect('/adminpage')
	}, 
	(user) => {
		console.log('user')
		User.findByEmailPassword(email, password).then(
		(user) => {
			req.session.user = user
			res.redirect('/feedpage')
		}, 
		(reject) => {
			res.status(400).redirect('/login')
		})
	}).catch((error) => {
		console.log(error)
		res.status(500)
	})
})

app.get('/', (req, res) => {
	res.render('index');
})

app.post('/admin_init', (req, res) => {
	const newAdmin = new Admin({
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
	})
	Admin.create(newAdmin).then((result) => {
		req.session.user = result
		// console.log(result)
	}, (error) => {
		res.status(500).send(error)
	})
})


app.get('/adminpage', (req, res) => {
	//return admin and users and posts
	console.log('adminpage rendering')
	res.render('adminpage');
})

app.get('/adminpage/info', (req, res) => {
	//return admin and users and posts
	let info = []
	User.find({}).then((users) => {
		if (users) {
			console.log(users)
			info.push(users)
			return Post.find({})
		} 
	}).then((posts) => {
		if (posts) {
			console.log(posts)
			info.push(posts)
			res.send(info)
		}
	}).catch((error) => {
		console.log(error)
		res.status(500)
	})
})

app.patch('/adminpage/ban_user', (req, res) => {
	User.findOneAndUpdate({email: req.body.email}, {$set: {isBanned: req.body.isBanned}}, {new: true})
	.then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send(user)
		}
	}).catch((error) => {
		res.status(500).send(error)
	}) 
})

app.delete('/adminpage/delete_user', (req, res) => {
	User.findOneAndDelete({email: req.body.email}).then((user) => {
		if (!user) {
			return Promise.reject()
		} else {
			return Post.deleteMany({email: req.body.emai}).exec()
		}
	}).then((posts) => {
		if (posts) {
			res.send(posts)
		} else {
			res.status(404).send()
		}
	}, (reject) => {
		res.status(404).send()
	}).catch((error) => {
		res.status(500).send(error)
	})
})

app.delete('/adminpage/delete_post', (req, res) => {
	User.update({email: req.body.email}, {$pull: {posts: {$eq: req.body.id}}}).then((user) => {
		if (!user) {
			return Promise.reject()
		} else {
			return Post.findOneAndDelete({_id: req.body.id}).exec()
		}
	}).then((post) => {
		if (post) {
			res.send(post)
		} else {
			res.status(404).send()
		}
	}).catch((error) => {
		res.status(500).send(error)
	})
})

// app.get('/profile', sessionChecker, (req, res) => {
// 	res.render('profile', {userName: "UserX", msgCount: 30, isBuyer: false, userImg: "/img/profile-image.jpg", userEmail:"userX@gmail.com", userPhone:"4166666666", isBanned: false, userDescription:"Somewhere Over The Rainbow"});
// })

app.get('/messages/inbox', authenticate, (req, res) => {
	res.send(req.user)
}, (error) => {
	res.status(500).send(error)
})

app.get('/messages', authenticate, (req, res) => {
	const starredNum = 0
	const inboxNum = 0
	const sentNum = 0
	for (let msg of req.user.messages) {
		if (msg.isStarred) {
			starredNum++
		} else if (msg.from == req.user.email) {
			sentNum++
		} else {
			inboxNum++
		}
	}
	res.render('messages', {userName: req.user.name, msgCount: req.user.messages.length, isBuyer: req.user.isBuyer,
	inboxNum: inboxNum, sentNum: sentNum, starredNum: starredNum})	
}, (error) => {
	res.status(500).send(error)
})
	
// #################################################################################
// app.post('/messages/send_new', authenticate, (req, res) => {
// 	User.findOneAndUpdate({email: req.user.email}, {$push: {messages: req.body}}).exec().then(re
// 		const d
// 		User.findOneAndUpdate({email: req.body.to}, {$})
// 	).then()
// })

// app.get('/messages/inbox', authenticate, (req, res) => {
// 	if (req.session.user) {
// 		User.findOne({email: req.session.user.email}).then((user) => {
// 			if (user) {
// 				res.send(user)	
// 			} else {
// 				res.status(404).send()
// 			}
// 		}).catch((error) => {
// 			res.status(500).send(error)
// 		})
// 	} else {
// 		res.redirect('/login')
// 	}
// })

app.get('/feedpage', (req, res) => {
	res.render('feedpage', {userName: req.session.user.name, msgCount: req.session.user.messages.length, isBuyer: req.session.user.isBuyer});
})

app.route('/signup')
	.get(loginChecker, (req, res) => {
		res.render('signup');
	})
	.post((req, res) => {
		const name = req.body.name;
		const email = req.body.email;
		const phone = req.body.phone;
		const password = req.body.password;
		const isBuyer = req.body.isBuyer;	
		// create new user to db
		const queryCondition = { name: name, email: email }; // double check
		User.findOne(queryCondition).exec()
		.then((result) => {
			if (!result) { // Not found then sign up
				const newUser = new User({
					name: name,
    				password:  password,
    				email: email,
    				messages: [],
    				isBuyer: isBuyer,
    				isBanned: false,
    				posts: [],
    				phone: phone,
    				description: ""
				});
				return User.create(newUser);
			} else { // Found then reject
				console.log('This email has already been signed up.');
				return Promise.reject(result);
			}
		})
		.then(
			(resolve) => {
				req.session.user = resolve;
				res.send('/feedpage');
			}, 
			(reject) => {
				req.session.user = reject;
				res.send('/login');
			}
		)
		.catch((err)=>{
			console.log(err);
			res.send(err);
		})
	})
app.get('/messages', (req, res) => {
	res.render('messages', {userName: req.session.user.name, msgCount: req.session.user.messages.length, isBuyer: req.session.user.isBuyer, inboxNum: 3, sentNum: 2, starredNum: 1});
})
app.get('/orders/seller', (req, res) => {
	res.render('orderpage_seller');
})
app.get('/orders/buyer', (req, res) => {
	res.render('orderpage_buyer');
})
app.get('/detail/seller', (req, res) => {
	res.render('product_detail_seller');
})
app.get('/detail/buyer', (req, res) => {
	res.render('product_detail_buyer');
})
app.get('/profile', sessionChecker, (req, res) => {
	res.render('profile', {userName: req.session.user.name, msgCount: req.session.user.messages.length, isBuyer: req.session.user.isBuyer, userImg: "/img/profile-image.jpg", userEmail: req.session.user.email, userPhone: req.session.user.phone, isBanned: req.session.user.isBanned, userDescription: req.session.user.description});
})

app.get('/get_feeds_header', (req, res) => {
	User.findOne({ email: req.session.user.email }).exec()
	.then(async (foundUser) => {
		if (req.session.user.isBuyer) {
			const foundActiveOrderCount = await Order.find({ buyerEmail: req.session.user.email, status: "active" }).exec();
			return [foundUser, foundActiveOrderCount.length];
		} else if (!req.session.user.isBuyer) {
			const foundActiveOrderCount_1 = await Order.find({ sellerEmail: req.session.user.email, status: "active" }).exec();
			return [foundUser, foundActiveOrderCount_1.length];
		}
	})
	.then(async (result) => {
		if (req.session.user.isBuyer) {
			const foundFinishedOrderCount = await Order.find({ buyerEmail: req.session.user.email, status: "finished" }).exec();
			result.push(foundFinishedOrderCount.length);
			return result;
		} else if (!req.session.user.isBuyer) {
			const foundFinishedOrderCount_1 = await Order.find({ sellerEmail: req.session.user.email, status: "finished" }).exec();
			result.push(foundFinishedOrderCount_1.length);
			return result;
		}
	})
	.then(async (result) => {
		const foundPostedCount = await Post.find({ email: req.session.user.email }).exec();
		result.push(foundPostedCount.length);
		return result;
	})
	.then((result) => {
		res.send(result);
	})
	.catch((err) => {
		console.log(err);
		res.send(err);
	})
})

app.get('/get_feeds', (req, res) => {
	if (req.session.user.isBuyer) {
		Post.find({ type: "offer" }).exec()
		.then((result) => {
			res.send(result);
		})
	} else if (!req.session.user.isBuyer) {
		Post.find({ type: "request" }).exec()
		.then((result) => {
			res.send(result);
		})
	}
})

app.get('/get_posts', (req, res) => {
	Post.find({ email: req.session.user.email }).exec()
	.then((result) => {
		res.send(result);
	})
})

app.get('/search', (req, res) => {
	// Post.find({ email: req.session.user.email }).exec()
	// .then((result) => {
	// 	res.send(result);
	// })

})

app.post('/posts', (req, res) => {
	const newPost = new Post({
		email: req.session.user.email,
		type: req.session.user.isBuyer ? "request" : "offer",
		date: new Date(),
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		quantity: req.body.quantity,
		image: req.body.image,
		completed: false,
		dueDate: req.body.dueDate,
		category: req.body.category
	})
	Post.create(newPost).then(
	(result) => {
		req.session.user = result;
		User.findOneAndUpdate({ email: req.session.user.email }, { $push: { posts: result._id } }, (err, result) => {
			if (err) console.log("Update posts in user:", err)
		});
	},
	(reject) => {
		res.status(500).send(reject);
	})
})

app.get('/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})



app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening on port 3000...')
	}
})
