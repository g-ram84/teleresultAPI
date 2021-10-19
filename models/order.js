const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	id: { type: String },
	title: { type: String, required: [true, "Must have a title"] },
	date: Date,
	type: { type: String, required: [true, "Must have a type"] },
	customer: { type: String, required: [true, "Customer must provide name"] }
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
