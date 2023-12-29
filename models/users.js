const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	created: {
		type: Date,
		required: true,
		default: Date.now,
	},
})
module.exports = mongoose.model("User", userSchema)
