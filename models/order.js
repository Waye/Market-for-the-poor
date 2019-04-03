const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    producImage: String,
    productName: String,
    status: String,
    arriveDate: Date,
    shipAddr: String,
    buyerEmail: String,
    sellerEmail: String
});

module.exports = mongoose.model("Order", OrderSchema);