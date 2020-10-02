const { Schema, model } = require("mongoose");
const InterestSchema = new Schema({
	item: { type: String, required: true }
});
const Interest = model("Interest", InterestSchema);
module.exports = Interest;
