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
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const Post = mongoose.model('Post');


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
		res.redirect('login')
	} else {
		next();
	}
}

const loginChecker = (req, res, next) => {
	if (req.session.user) {
		next();
	} else if (req.url =="/signup") {
		res.render('signup');
	} else if (req.url =="/login") {
		res.render('login');
	}
}

app.route('/login')
	.get(loginChecker, (req, res) => {
		res.render('feedpage_seller');	
	})
	.post((req, res) => {
		const email = req.body.email
		const password = req.body.password

		User.findByEmailPassword(email, password).then((user) => {
			if(!user) {
				res.redirect('login')
			} else {
				// Add the user to the session cookie that we will
				// send to the client
				req.session.user = user
				res.redirect('feedpage_seller')
			}
		}).catch((error) => {
			res.status(400).redirect('login')
		})
			
	})

app.get('/', (req, res) => {
	res.render('index');
})
app.get('/admin', (req, res) => {
	res.render('admin');
})
app.get('/feedpage/seller', (req, res) => {
	res.render('feedpage_seller');
})
app.get('/feedpage/buyer', (req, res) => {
	res.render('feedpage_buyer');	
})

app.route('/signup')
	.get(loginChecker, (req, res) => {
		res.render('feedpage_seller');
	})
	.post((req, res) => {
		// res.render('signup');
		const name = req.body.name;
		const email = req.body.email;
		const phone = req.body.phone;
		const password = req.body.password;
		const isBuyer = req.body.isBuyer;	
		// create new user to db
		const queryCondition = { name: name, email: email }; // double check
		User.findOne(queryCondition).exec()
		.then((result) => {
			if (!result) { // Not found
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
			} else { // found
				console.log('This email has already been signed up.');
          		res.send(false);
			}
		})
		.then((result) => {
			req.session.user = result;
			res.redirect('feedpage_seller');
			// res.send(true);
		})
		.catch((err)=>{
			console.log(err);
			res.send(err);
		})
	})
app.get('/messages/seller', (req, res) => {
	res.render('messages_seller');
})
app.get('/messages/buyer', (req, res) => {
	res.render('messages_buyer');
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
app.get('/profile/seller', (req, res) => {
	res.render('profile_seller');
})
app.get('/profile/buyer', (req, res) => {
	res.render('profile_buyer');
})

// User login and logout routes

app.post('/users/login', (req, res) => {
	const email = req.body.email
	const password = req.body.password

	User.findByEmailPassword(email, password).then((user) => {
		if(!user) {
			res.redirect('/login')
		} else {
			// Add the user to the session cookie that we will
			// send to the client
			req.session.user = user._id;
			req.session.email = user.email
			res.redirect('/dashboard')
		}
	}).catch((error) => {
		res.status(400).redirect('/login')
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

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening on port 3000...')
	}
})
