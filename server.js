const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Order = require("./models/order");
const PORT = 5000;

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
	res.send({ orders });
});

app.post(
	"/orders",
	wrapAsync(async (req, res) => {
		const order = new Order(req.query);
		await order.save();
		res.send(order);
	})
);

app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`);
});
