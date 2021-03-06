const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	title: {
		type: String,
		lowercase: true,
		required: [true, "Must have a title"]
	},
	date: {
		type: String,
		required: [true, "Please enter date in yyyy-dd-mm format"]
	},
	type: { type: String, lowercase: true, required: [true, "Must have a type"] },
	customer: {
		type: String,
		lowercase: true,
		required: [true, "Customer must provide name"]
	}
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
