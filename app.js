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
	// console.log(req.session.user)
	if (req.session.user) {
		next();
	} else if (req.url =="/signup") {
		res.render('/signup');
	} else if (req.url =="/login") {
		res.redirect('/login');
	}
}

const tempChecker = (req, res, next) => {
	if (!req.session.user) {
		next();
	} else if (req.session.user.email == "admin@gmail.com") {
		res.redirect('/adminpage');
	} else {
		res.redirect('/feedpage_seller');
	}
}

app.route('/login')
	.get(tempChecker, (req, res) => {
		// console.log(req.session.user)
		console.log('get for login')
		res.render('login.ejs');	
	})
	
app.post('/login', (req, res) => {
	const email = req.body.uname;
	const password = req.body.psw;
	Admin.findByEmailPassword(email, password).then((admin) => {
	
		console.log('admin')
		// console.log(admin)
		req.session.user = admin
		res.redirect('/adminpage')

	}, (error) => {
		console.log('user')
		User.findByEmailPassword(email, password).then((user) => {
			req.session.user = user
			res.redirect('/feedpage_seller')
		}, (error) => {
			res.status(400).redirect('/login')
		})
	})
})



// app.get('/', (req, res) => {
// 	res.render('index');
// })
app.get('/adminpage', (req, res) => {
	//return admin and users and posts
	console.log('adminpage rendering')
	res.render('adminpage.ejs');
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

app.get('/feedpage/seller', (req, res) => {
	res.render('feedpage_seller');
})
app.get('/feedpage/buyer', (req, res) => {
	res.render('feedpage_buyer');	
})

app.post('/admin_init', (req, res) => {
	const newAdmin = new Admin({
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
		sellers: [],
		buyers: [],
		requests: [],
		offers: []
	})
	Admin.create(newAdmin).then((result) => {
		req.session.user = result
		// console.log(result)
	}, (error) => {
		res.status(500).send(error)
	})
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
          		res.send("exist");
			}
		})
		.then((result) => {
			req.session.user = result;
			// res.redirect('feedpage_seller');
			res.send(true);
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
