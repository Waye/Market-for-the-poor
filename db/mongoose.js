const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserAPI'
mongoose.connect(mongoURI, { useNewUrlParser: true});
module.exports = {mongoose}