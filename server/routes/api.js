const express = require("express");
const router = express.Router();
router.get('/', async (req, res, next) => {
	console.log("endpoint: get");
	res.send("GET /");
})
module.exports = router;