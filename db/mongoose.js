const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://leeestephen:qb2Z42TWDYj34qZ@cluster0-w2ffd.mongodb.net/csc309?retryWrites=true'
// const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserAPI'
mongoose.connect(mongoURI, { useNewUrlParser: true});
module.exports = {mongoose}