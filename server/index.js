const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());

const serverport = process.env.SERVER_PORT || 4000;
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_URI } = process.env;
const DB_USERPASS = DB_PASSWORD && DB_USER ? `${DB_USER}:${DB_PASSWORD}@` : "";

const startServer = async () => {
	app.listen(serverport, () => {
		console.log("Listening on port :", serverport);
	});
};

const accessAPI = async () => {
	app.use("/api", require("./routes/api"));

	app.use((err, req, res, next) => {
		res.status(422).send({ error: err._message });
	});
};

startServer();
accessAPI();