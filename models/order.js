const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    postId: String,
    producImage: String,
    productName: String,
    status: String,
    arriveDate: Date,
    shipAddr: String,
    buyerId: String,
    sellerId: String
});

module.exports = mongoose.model("Order", OrderSchema);