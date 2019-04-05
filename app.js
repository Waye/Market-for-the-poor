const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser'); // middleware for parsing HTTP body from client
const session = require('express-session');
const ejs = require('ejs');
const fs = require('fs');
const formidable = require("formidable");

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
                req.session.destroy((error) => {
                    if (error) {
                        console.log(error)
                    }
                })
                return Promise.reject()
            } else {
                req.user = user;
                next()
            }
        }).catch((error) => {
            req.session.destroy((error) => {
                if (error) {
                    res.status(500).send(error)
                } else {
                    res.redirect('/login')
                }
            })
        })
    } else {
        req.session.destroy((error) => {
            if (error) {
                res.status(500).send(error)
            } else {
                res.redirect('/login')
            }
        })
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
    User.findOneAndDelete({_id: req.body.id}).then((user) => {
        if (!user) {
            return Promise.reject()
        } else {
            return Post.deleteMany({userId: req.body.id}).exec()
        }
    }).then((posts) => {
        if (posts.deletedCount > 0) {
            res.send([1])
        } else {
            res.send([])
        }
    }, (reject) => {
        res.status(404).send()
    }).catch((error) => {
        res.status(500).send(error)
    })
});

//DELETE posts in by admin
app.delete('/adminpage/delete_post', (req, res) => {
    Post.findOneAndDelete({_id: req.body.id}).then((post) => {
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
                if (result.length == 0) { // Not found then sign up
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


app.get('/orders', authenticate,(req, res) => {
    res.render('orderpage', {userName: req.user.name, msgCount: countUnread(req.user), isBuyer: req.user.isBuyer});
})

// A pure backend method that simulates a delivered
// message, sent from the delivery company.
app.patch('/delivered/:id', (req, res) => {
    const orderId = req.params.id;
})

app.patch('/detail/:id', (req, res) => {
    const postId = req.params.id;
    const arriveDate = req.body.arriveDate;
    const shipAddr = req.body.shipAddr;
    const respondUser = req.session.user;
})

app.get('/detail/:id', authenticate, (req, res) => {
    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        return res.status(404).send()
    }
    Post.findById(new ObjectID(postId)).exec()
    .then((foundPost) => {
        if (!foundPost) return res.status(500).send();
        const renderData = {
            postId: foundPost._id,
            postDate: foundPost.date,
            postDueDate: foundPost.dueDate,
            postTitle: foundPost.title,
            postPrice: foundPost.price,
            postQuantity: foundPost.quantity,
            postImages: foundPost.image,
            postDescription: foundPost.description,
            userName: req.user.name,
            msgCount: countUnread(req.user),
            isBuyer: req.user.isBuyer
        }
        // res.render('product_detail', renderData);
        return User.findById(new ObjectID(foundPost.userId)).exec().then((founduser) => {
            if (!founduser) return res.status(500).send()
            const renderDataNext = {
                postOwnerId: founduser._id,
                postOwnerIsBuyer: founduser.isBuyer,
                postOwnerIcon: founduser.icon,
                postOwnerName: founduser.name,
                postOwnerDescription: founduser.description,
                postOwnerPhone: founduser.phone,
            }
            return Object.assign(renderData, renderDataNext)
        })
    }).then((joinedData) => {
        console.log(joinedData);
        res.render('product_detail', joinedData)
    })
})

app.get('/profile', authenticate, (req, res) => {
    const user = req.user
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
})

app.get('/profile/:id', authenticate, (req, res) => {
    User.findOne({'_id': req.params.id}).exec().then(
    (user) => {
        Post.find({userId: user._id, category: "food"}).exec().then((r1) => {
            return Post.find({userId: user._id, category: "electronics"}).exec().then((r2) => {
                return Post.find({userId: user._id, category: "clothing"}).exec().then((r3) => {
                    return Post.find({userId: user._id, category: "furniture"}).exec().then((r4) => {
                        return Post.find({userId: user._id, category: "tool"}).exec().then((r5) => {
                                return Post.find({userId: user._id, category: "other"}).exec().then((r6) => {
                                    return [r1, r2, r3, r4, r5, r6, user];
                                })
                            }
                        )
                    });
                });
            });
        }).then((rList) => {
            const targetUser = rList[6];
            const loggedInUser = req.user;
            res.render('profileOther', {
                targetUserId: targetUser._id,
                target_userName: targetUser.name,
                target_isBuyer: targetUser.isBuyer,
                target_userImg: "/img/profile-image.jpg",
                target_userEmail: targetUser.email,
                target_userPhone: targetUser.phone,
                target_isBanned: targetUser.isBanned,
                target_userDescription: targetUser.description,

                userName: loggedInUser.name,
                msgCount: countUnread(req.user),
                isBuyer: loggedInUser.isBuyer,
                userImg: "/img/profile-image.jpg",
                userEmail: loggedInUser.email,
                userPhone: loggedInUser.phone,
                isBanned: loggedInUser.isBanned,
                userDescription: loggedInUser.description,
                total: rList[0].length + rList[1].length + rList[2].length + rList[3].length + rList[4].length + rList[5].length,
                numberFood: rList[0].length,
                numberElectronics: rList[1].length,
                numberClothing: rList[2].length,
                numberFurniture: rList[3].length,
                numberTools: rList[4].length,
                numberOther: rList[5].length
            })
        });
    },
    (reject) => {
        console.log(reject)
    })
    .catch((err) => {
        console.log("profileOther for id:", err)
    })
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

app.get('/get_posts/:id', (req, res) => {
	Post.find({ userId: req.params.id }).exec()
	.then((result) => {
		res.send(result);
	})
})

app.get('/get_orders', (req, res) => {
	if (req.session.user.isBuyer) {
		Order.find({ buyerEmail: req.session.user.email }).exec()
		.then((result) => {
			res.send(result);
		})
	} else if (!req.session.user.isBuyer) {
		Order.find({  sellerEmail: req.session.user.email }).exec()
		.then((result) => {
			res.send(result);
		})
	}
});

app.get('/get_orders_users', (req, res) => {
	if (req.session.user.isBuyer) {
		Order.find({ buyerId: req.session.user._id }).exec()
		.then((result) => {
			res.send(result);
		})
	} else if (!req.session.user.isBuyer) {
		Order.find({ sellerId: req.session.user._id }).exec()
		.then((result) => {
			res.send(result);
		})
	}
});

app.post('/search', (req, res) => {
    let searchKey = new RegExp(req.body.keyword, 'i')
    Post.find({$or: [{userName: searchKey}, {title: searchKey}]}).then((result) => {
        if (result.length > 0) {
            res.send(result)
        } else {
            res.status(404).send('404')
        }
    }).catch((error) => {
        res.status(500).send()
    })
})

app.post('/postsImg', (req, res) => {
    // console.log("postImg body: ", req.body.file)
    new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
        console.log('Field', name, field)
    })
    .on('fileBegin', (name, file) => {
        form.on('fileBegin', (name, file) => {
            file.path = __dirname + '/uploads/' + file.name
        })
    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file)
    })
    .on('aborted', () => {
      console.error('Request aborted by the user')
    })
    .on('error', (err) => {
      console.error('Error', err)
      throw err
    })
    .on('end', () => {
      res.end()
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