const mongoose = require("mongoose");
const Order = require("./models/order");

mongoose
	.connect("mongodb://localhost:27017/TeleResultAPI", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("MONGO CONNECTION OPEN!");
	})
	.catch((err) => {
		console.log("OH NO MONGO ERROR!!");
		console.log(err);
	});

const seedOrder = [
	{
		id: "1",
		title: "new cell phone",
		date: "2020-01-02",
		type: "iPhone",
		customer: "chalmers.graeme@gmail.com"
	},
	{
		id: "2",
		title: "new laptop",
		date: "2020-01-02",
		type: "macbook",
		customer: "mattsalakas@hotmail.com"
	},
	{
		id: "3",
		title: "new cell phone",
		date: "2020-01-02",
		type: "iPhone",
		customer: "jonsmith@gmail.com"
	},
	{
		id: "4",
		title: "new cell phone",
		date: "2020-01-02",
		type: "iPhone",
		customer: "gorddownie@thehip.ca"
	}
];

Order.insertMany(seedOrder)
	.then((res) => {
		console.log(res);
	})
	.catch((e) => {
		console.log(e);
	});
