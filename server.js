const express = require("express");
const app = express();
const PORT = 5000;

app.post("/orders", (req, res) => {});

app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT}`);
});
