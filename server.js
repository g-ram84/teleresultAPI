const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Order = require("./models/order");
const PORT = 5000;

// I used examples from a UDEMY course in order to help set up my code with Mongoose/MongoDB

mongoose
	.connect(`mongodb://localhost:27017/TeleResultAPI`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected to MongoDB!");
	})
	.catch((err) => {
		console.log("Oh No, Mongo Error!");
		console.log(err);
	});

function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch((e) => next(e));
	};
}

app.get("/orders", async (req, res) => {
	const orders = await Order.find({});
	res.send({ orders });
});

app.get("/orders/:id", async (req, res) => {
	const { id } = req.params;
	const orders = await Order.findById(id);
	if (id === null) {
		res.status(403);
		res.send("Please ensure order ID is correct");
	} else {
		res.send({ orders });
	}
});

app.get("/orders/:type/:date", async (req, res) => {
	const ordersArr = [];
	const customersArr = [];
	const { type, date } = req.params;
	const newDate = date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
	const orders = await Order.find({ type, date: newDate }).catch((e) =>
		console.log(e)
	);
	if (orders.length === 0) {
		res.status(403);
		res.send("No entries for date and type");
	} else if (orders) {
		orders.forEach((e) => ordersArr.push(e.id));
		orders.forEach((e) => customersArr.push(e.customer));
		let uniqueArr = [...new Set(customersArr)];
		const orderTemplate = {
			type,
			count: orders.length,
			orders: ordersArr,
			related_customer: uniqueArr
		};
		res.send({ orderTemplate });
	}
});

app.post(
	"/orders",
	wrapAsync(async (req, res) => {
		const order = new Order(req.query);
		if (!order.title || !order.type || !order.date || !order.customer) {
			res.status(403);
			res.send("Please complete all required fields");
		}
		await order.save();
		res.send(order);
	})
);

app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`);
});
