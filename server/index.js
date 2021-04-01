const express = require("express");
const cors = require("cors");
const app = express();
const config = require('./config')

app.use(express.json());

const serverport = config.ports.server;
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
	let limit = config.server.limit
	let methods = ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"];
	let domains = [config.client.uri];
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
		console.log("setting up Access Control Headers");
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	});

	// fileSize limit from client
	app.use(express.json({ limit: config.server.limit }));
	console.log("Accepted File Size Limit set to :",limit);
}

setupAccessControl();
connectDatabase();
startServer();
accessAPI();