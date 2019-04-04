const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser'); // middleware for parsing HTTP body from client
const session = require('express-session');
const ejs = require('ejs');
const fs = require('fs');

const cookieParser = require('cookie-parser');
const {ObjectID} = require('mongodb');

// Import mongoose connection
const {mongoose} = require('./db/mongoose');

// Import the models
require('./models/user');
require('./models/admin');
require('./models/post');
require('./models/order');
const User = mongoose.model('User');
const Admin = mongoose.model('Admin');
const Post = mongoose.model('Post');
const Order = mongoose.model('Order');


// express
const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());
// parse incoming parameters to req.body
app.use(bodyParser.urlencoded({extended: true}));
// static directory for js/css/html
app.use(express.static(__dirname + '/public'));
// set the view library
app.set('view engine', 'ejs');

app.use(cookieParser());

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
}));

// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next();
    }
};

const loginChecker = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else if (req.session.user.email == "admin@gmail.com") {
        res.redirect('/adminpage');
    } else {
        res.redirect('/feedpage');
    }
};

// Middleware for authentication for resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user;
                next()
            }
        }).catch((error) => {
            res.redirect('/login')
        })
    } else {
        res.redirect('/login')
    }
};


app.route('/login')
	.get(loginChecker, (req, res) => {
		// console.log(req.session.user)
		console.log('get for login');
		res.render('login');	
	})
	.post((req, res) => {
	const email = req.body.uemail;
	const password = req.body.psw;
	Admin.findByEmailPassword(email, password).then(
	(admin) => {
		console.log('admin');
		// console.log(admin)
		req.session.user = admin;
		res.redirect('/adminpage')
	}, 
	(user) => {
		console.log('user');
		User.findByEmailPassword(email, password).then(
		(user) => {
			console.log(user)
			req.session.user = user;
			res.redirect('/feedpage')
		}, 
		(reject) => {
			console.log(reject)
			res.status(400).redirect('/login')
		})
	}).catch((error) => {
		console.log(error);
		res.status(500)
	})
});

app.get('/', (req, res) => {
    res.render('index');
});

// POST for making one admin user. Cannot make from the website
app.post('/admin_init', (req, res) => {
    const newAdmin = new Admin({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    });
    Admin.create(newAdmin).then((result) => {
        req.session.user = result
        // console.log(result)
    }, (error) => {
        res.status(500).send(error)
    })
});

// GET for rendering adminpage
app.get('/adminpage', (req, res) => {
    console.log('adminpage rendering');
    res.render('adminpage');
});

// GET requests for getting dynamic compontents: all users and posts
app.get('/adminpage/info', (req, res) => {
    //return admin and users and posts
    let info = [];
    User.find({}).then((users) => {
        if (users) {
            console.log(users);
            info.push(users);
            return Post.find({})
        }
    }).then((posts) => {
        if (posts) {
            console.log(posts);
            info.push(posts);
            res.send(info);
        }
    }).catch((error) => {
        console.log(error);
        res.status(500);
    })

});

// BAN user by admin
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
});

//DELETE user by admin
app.delete('/adminpage/delete_user', (req, res) => {
    User.findOneAndDelete({email: req.body.email}, {new: true}).then((user) => {
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
});

//DELETE posts in by admin
app.delete('/adminpage/delete_post', (req, res) => {
    User.update({email: req.body.email}, {$pull: {posts: {$eq: req.body.id}}}, {new: true}).then((user) => {
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
});

// GET for dynamic components of messages.ejs
app.get('/messages/updated', authenticate, (req, res) => {
	res.send(req.user)
});

// GET for rendering messages.ejs
app.get('/messages', authenticate, (req, res) => {
    let starredNum = 0;
    let inboxNum = 0;
	let sentNum = 0;
	let unread = 0;
    for (let msg of req.user.messages) {
        if (msg.from == req.user.email) {
            sentNum++
        } else {
            inboxNum++
		}
		if (msg.isStarred) {
            starredNum++
		} 
		if (!msg.isRead && msg.to == req.user.email) {
			unread++
		}
    }
    res.render('messages', {
        userName: req.user.name, msgCount: unread, isBuyer: req.user.isBuyer,
        inboxNum: inboxNum, sentNum: sentNum, starredNum: starredNum
    })
}, (error) => {
    res.status(500).send(error)
});

// POST for sending new message. send reply also handled here
app.post('/messages/send_new', authenticate, (req, res) => {
	User.findOneAndUpdate({email: req.body.to}, {$push: {messages: req.body}}, {new: true}).exec()
	.then((targetUser) => {
		if (!targetUser) {
			return Promise.reject(new Error('404'))
		}
		return User.findOneAndUpdate({email:req.user.email}, {$push: {messages: req.body}}, {new: true}).exec()
	})
	.then((user) => {
		if (!user) {
			res.status(404).send('404')
		}
		else {
			res.send(user.messages)
		}
	}).catch((error) => {
        if (error.message == '404') {
            res.status(404).send('404')
        } else {
            res.status(500).send('505')
        }
	})
});

app.patch('/messages/star_unstar', authenticate, (req, res) => {
	for (let msg of req.user.messages) {
		if (msg.content == req.body.content && (msg.from == req.body.target || msg.to == req.body.target)) {
			msg.isStarred = !msg.isStarred
		}
	}
	User.findOneAndUpdate({_id: req.user._id}, {$set: {messages: req.user.messages}}, {new: true})
	.then((user) => {
		res.send(user)
	}).catch((error)  => {
		res.status(500).send(error)
	})
});

app.delete('/messages/delete', authenticate, (req, res) => {
	let index = 0
	for (let msg of req.user.messages) {
		if (msg.content == req.body.content && (msg.from == req.body.target || msg.to == req.body.target)) {
			break
		}
		index++
	}
	req.user.messages.splice(index, 1)
	User.findOneAndUpdate({_id: req.user._id}, {$set: {messages: req.user.messages}}, {new: true})
	.then((user) => {
		res.send(user)
	}).catch((error) => {
		res.status(500).send(error)
	})
})

app.patch('/messages/read', authenticate, (req, res) => {
	for (let msg of req.user.messages) {
		if (msg.from == req.body.from && !msg.isRead) {
			msg.isRead = true
		}
	}
	User.findOneAndUpdate({_id: req.user._id, email: req.body.to}, {$set: {messages: req.user.messages}}, {new: true})
	.then((user) => {
		res.send(user.messages)
	}).catch((error) => {
		res.status(500).send(error)
	})
})

app.get('/search', (req, res) => {
    User.findOne({})
})

app.get('/feedpage', authenticate, (req, res) => {
	let unread = countUnread(req.user)
    res.render('feedpage', {userName: req.user.name, msgCount: unread, isBuyer: req.user.isBuyer});
});

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
        const queryCondition = {$or: [{name: name}, {email: email}]}; // double check
        User.find(queryCondition).exec()
            .then((result) => {
                if (!result) { // Not found then sign up
                    const newUser = new User({
                        name: name,
                        password: password,
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
                    return Promise.reject();
                }
            })
            .then(
                (resolve) => {
                    req.session.user = resolve;
                    res.send('/feedpage');
                },
                (reject) => {
                    req.session.destroy((error) => {
                        if (error) {
                            res.status(500).send(error)
                        } else {
                            res.send('/login');
                        }
                    });
                }
            )
            .catch((err) => {
                console.log(err);
                res.send(err);
            })
    });

app.get('/orders', (req, res) => {
    res.render('orderpage');
});
app.get('/detail/seller', (req, res) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}
	var Post = db.model('Post',PostSchema);
	Post.findById(id).then((post) => {
		if(!post) {
			res.status(404).send();
		}
		else {
			res.send({ post });
		}
	}, (error) => {
		res.status(400).send(error)
	});
	res.render('product_detail_seller', {
		name: post.name,
		type: post.type,
		date: post.date,
		title: post.title,
		description: post.description,
		quantity: post.quantity,
		price: post.price,
		image: post.image,
		completed: post.completed,
		dueDate: post.dueDate,
		category: post.category
	});
  
    res.render('product_detail_seller');
});
app.get('/detail/buyer', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    Post.findById(id).then((post) => {
        if(!post) {
            res.status(404).send();
        }
        else {
            res.send({ post });
        }
    }, (error) => {
        res.status(400).send(error)
    });
    res.render('product_detail_buyer', {
        name: post.name,
        type: post.type,
        date: post.date,
        title: post.title,
        description: post.description,
        quantity: post.quantity,
        price: post.price,
        image: post.image,
        completed: post.completed,
        dueDate: post.dueDate,
        category: post.category
    });
});

app.get('/profile', authenticate, (req, res) => {
    const user = req.user
    // const Posts=User.posts

    Post.find({userId: user._id, category: "food"}).exec().then((r1) => {
        return Post.find({userId: user._id, category: "electronics"}).exec().then((r2) => {
            return Post.find({userId: user._id, category: "clothing"}).exec().then((r3) => {
                return Post.find({userId: user._id, category: "furniture"}).exec().then((r4) => {
                    return Post.find({userId: user._id, category: "tool"}).exec().then((r5) => {
                            return Post.find({userId: user._id, category: "other"}).exec().then((r6) => {
                                return [r1, r2, r3, r4, r5, r6];
                            })
                        }
                    )
                });
            });
        });
    }).then((rList) => {
		let unread = countUnread(user)
        res.render('profile', {
            userName: user.name,
            msgCount: unread,
            isBuyer: user.isBuyer,
            userImg: "/img/profile-image.jpg",
            userEmail: user.email,
            userPhone: user.phone,
            isBanned: user.isBanned,
            userDescription: user.description,
            total: rList[0].length + rList[1].length + rList[2].length + rList[3].length + rList[4].length + rList[5].length,
            numberFood: rList[0].length,
            numberElectronics: rList[1].length,
            numberClothing: rList[2].length,
            numberFurniture: rList[3].length,
            numberTools: rList[4].length,
            numberOther: rList[5].length
        })
    });
});

app.get('/profile_info', (req, res) => {
    const user = req.session.user;
    res.send(user);
});

app.post('/post_data', (req, res) => {
    let post = req.session.post;
    post = new Post ({
        name: post.name,
        type: post.type,
        date: post.date,
        title: post.title,
        description: post.description,
        quantity: post.quantity,
        price: post.price,
        image: post.image,
        completed: post.completed,
        dueDate: post.dueDate,
        category: post.category
    });
    post.save().then(item => {
        res.send("Post saved to database!");
    }).catch(err => {
        res.status(400).send("Unable to save to database!");
    });
});




// Edit profile
app.patch('/profile/Edit', (req, res) => {
    // Add code here
    let email = req.body.email;
    let phone = req.body.phone;
    //let password = req.body.password;
    let description = req.body.description;



    User.findOneAndUpdate({_id: req.session.user._id}, {$set: {email: email, phone: phone, description: description}}, {new: true})
        .then((result) => {
            res.send(result)
        }).catch((error)  => {
        res.status(500).send(error)
    })

    // User.findOne({_id: req.session.user._id}).exec()
    //     .then((user) => {
    //         user.email= email;
    //         user.phone=phone;
    //         user.password=password;
    //         user.description=description;
    //
    //         user.save().then((result) => {
    //         res.send(result)
    //     }, (error) => {
    //         res.status(400).send(error)
    //     })
    // })
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
		const foundPostedCount = await Post.find({ userId: req.session.user._id }).exec();
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
});

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
});

app.get('/get_posts', (req, res) => {
	Post.find({ userId: req.session.user._id }).exec()
	.then((result) => {
		res.send(result);
	})
});

app.get('/search', (req, res) => {
    let searchKey = new RegExp(req.body.keyword, 'i')
    Post.find({$or: [{userName: searchKey}, {title: searchKey}]}).then((result) => {
        console.log(result)
        if (result) {
            res.send(result)
        } else {
            res.status(404).send()
        }
    }).catch((error) => {
        res.status(500).send()
    })
})

app.post('/posts', (req, res) => {
	const newPost = new Post({
		userId: req.session.user._id,
		userName: req.session.user.name,
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
		// req.session.user = result;
		User.findOneAndUpdate({ email: req.session.user.email }, { $push: { posts: result._id } }, (err, result) => {
			if (err) console.log("Update posts in user:", err)
		});
	},
	(reject) => {
		res.status(500).send(reject);
	})
});

app.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.redirect('/')
        }
    })
});



app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening on port 3000...')
    }
});

function countUnread(user) {
	let unread = 0
	for (let msg of user.messages) {
		if (!msg.isRead && msg.to == user.email) {
			unread++
		}
	}
	return unread
}