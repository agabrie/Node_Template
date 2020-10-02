const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());

const serverport = process.env.SERVER_PORT || 4000;
// const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_URI } = process.env;
// const DB_USERPASS = DB_PASSWORD && DB_USER ? `${DB_USER}:${DB_PASSWORD}@` : "";

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

const connectDatabase = async () => {
	console.log("connecting to database");
}

const setupAccessControl = async () => {
	let limit = "12mb"
	let methods = ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"];
	let domains = [process.env.Client_URI];
	// whitelisted domains
	app.use(
		cors({
			origin: domains,
			methods: methods,
			credentials: true,
		})
	);
	console.log("setting up CORS request types :",methods);
	console.log("from domains :", domains);
	
	// headers accepted
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	});
	console.log("setting up Access Control Headers");

	// fileSize limit from client
	app.use(bodyParser.json({ limit: limit }));
	console.log("Accepted File Size Limit set to :",limit);

}

setupAccessControl();
connectDatabase();
startServer();
accessAPI();