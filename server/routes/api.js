const express = require("express");
const router = express.Router();
const Template = require("../models/Template")
const Interest = require("../models/Interest");
router.get('/', async (req, res, next) => {
	console.log("endpoint: get");
	await Template.getAllTemplates((err, templates) => {
		console.log("cb -> ", err, templates);
	}).then(async (results) => {
		console.log("results", results);
		res.send(results);
	});
})
router.post('/', async (req, res, next) => {
	console.log("endpoint post");
	let { name, surname, detail, interests } = req.body;
	let interest = await Interest.find({})
	let allInterests = []
	interests.forEach((int) => {
		interest.forEach((ins) => {
			// console.log(int,ins)
			if (ins.item == int.item)
				allInterests.push(ins);
		})
	})
	// console.log(allInterests);
	let template = new Template({ name, surname, detail, interests:allInterests });
	await template.save().then((result) => {
		console.log(result);
		res.send(result);
	})
})
router.get("/interest", async (req, res, next) => {
	let interests = await Interest.find({});
	res.send(interests);
	console.log(interests);
});
router.post("/interest", async (req, res, next) => {
	console.log("endpoint post");
	let { item } = req.body;
	let interest = new Interest({ item });
	await interest.save().then((result) => {
		console.log(result);
		res.send(result);
	});
});
router.put('/:name', async (req, res, next) => {
	console.log("putting");
})
module.exports = router;