var mongoose = require("mongoose");

var Notification = new mongoose.Schema({
  userEmail: String,
  userTime: Date,
  userName: String
});

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
  role: Number,
  canvas: [String],
  occupation: String,
  status: Number,
  phone: String,
  company: String,
  notification: [Notification]
});

module.exports = mongoose.model("User", UserSchema);
