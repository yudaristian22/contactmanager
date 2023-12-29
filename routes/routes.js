const express = require("express")
const router = express.Router()
const User = require("../models/users")
const multer = require("multer")
const fs = require("fs")

// Insert an user into database route
router.post("/add", async (req, res) => {
	try {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			gender: req.body.gender,
			city: req.body.city,
			country: req.body.country,
			dob: req.body.dob,
		})

		await user.save()

		req.session.message = {
			type: "success",
			message: "User added successfully!",
		}
		res.redirect("/")
	} catch (err) {
		console.error(err)
		res.json({ message: "Error saving user", type: "danger" })
	}
})

// Get all users route
router.get("/", async (req, res) => {
	try {
		const users = await User.find().exec()
		res.render("index", {
			title: "Home Page",
			users: users,
		})
	} catch (err) {
		console.error(err)
		res.json({ message: err.message })
	}
})

router.get("/add", (req, res) => {
	res.render("add_users", { title: "Add Users" })
})

// Edit an user route
router.get("/edit/:id", async (req, res) => {
	try {
		const id = req.params.id
		const user = await User.findById(id).exec()

		if (!user) {
			res.redirect("/")
		} else {
			res.render("edit_users", {
				title: "Edit User",
				user: user,
			})
		}
	} catch (err) {
		console.error(err)
		res.redirect("/")
	}
})

// Update user route
router.post("/update/:id", async (req, res) => {
	try {
		const id = req.params.id

		await User.findByIdAndUpdate(id, {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			gender: req.body.gender,
			city: req.body.city,
			country: req.body.country,
			dob: req.body.dob,
		}).exec()

		req.session.message = {
			type: "success",
			message: "User updated successfully",
		}
		res.redirect("/")
	} catch (err) {
		console.error(err)
		res.json({ message: err.message, type: "danger" })
	}
})

// Delete user route
router.get("/delete/:id", async (req, res) => {
	try {
		const id = req.params.id
		await User.findByIdAndDelete(id).exec()

		req.session.message = {
			type: "info",
			message: "User deleted successfully!",
		}
		res.redirect("/")
	} catch (err) {
		console.error(err)
		res.json({ message: err.message })
	}
})

module.exports = router
