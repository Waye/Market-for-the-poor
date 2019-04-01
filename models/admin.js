const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    sellers: [String],
    buyers: [String],
    requests: [String],
    offers: [String]
});

module.exports = mongoose.model("Admin", AdminSchema);