const mongoose = require("mongoose");
const options = {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
    useNewUrlParser: true
};


const url = "mongodb+srv://leeestephen:qb2Z42TWDYj34qZ@cluster0-w2ffd.mongodb.net/csc309?retryWrites=true";
const db = mongoose.connect(url, options);