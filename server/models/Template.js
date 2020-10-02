const { Schema, model } = require("mongoose");
const Interest = require("./Interest").schema;

const TemplateSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	detail: { type: String, required: true },
	interests: [{type: Schema.Types.ObjectId, ref: "Item"}],
});
TemplateSchema.statics.getDetail = async function (name,cb) {
	return await Template.findOne({name:name},cb)
}
TemplateSchema.statics.getAllTemplates = async function (name, cb) {
	return await Template.find({}, cb);
};
TemplateSchema.methods.getInterests = function ( cb) {
	let interests = this.interests.sort();
	return cb(err, interests);
}

const Template = model("Template", TemplateSchema);
module.exports = Template;