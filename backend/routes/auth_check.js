const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const SuperAdmin = require("../models/SuperAdmin");
const Mapping = require("../models/Mapping");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
oauth = require("../config/oauth");

//add your email here if you want to be a super admin
const superAdmins = process.env.SUPER_ADMINS.split(",");

router.post("/user_check", (req, res) => {
	const userDetails = req.body;

	oauth(userDetails.idToken)
		.then((user) => {
			const id = user["sub"];
			const email = userDetails.email.split("@");
			const email_check = email[1];

			if (superAdmins.includes(userDetails.email)) {
				SuperAdmin.findOne({ email: userDetails.email }).then((user) => {
					if (user) {
						user.google_id.idToken = userDetails.idToken;
						role = "super_admin";
						user
							.save()
							.then((result) => {
								res.json({
									isRegistered: true,
									position: role,
									user_details: userDetails,
								});
							})
							.catch((err) => {
								res.json({
									isRegistered: true,
									position: "error",
									user_details: "SuperAdmin Not Saved - DB Error",
								});
							});
					} else {
						res.json({
							isRegistered: false,
							position: "super_admin",
							user_details: userDetails,
						});
					}
				});
			} else if (
				email_check === "iitpkd.ac.in" ||
				email_check === "gmail.com"
			) {
				Faculty.findOne({ email: userDetails.email })
					.then((user) => {
						if (user) {
							user.google_id.idToken = userDetails.idToken;

							var role = "";
							if (user.isAdmin) {
								role = "admin";
							} else {
								role = "faculty";
							}

							user
								.save()
								.then((result) => {
									res.json({
										isRegistered: true,
										position: role,
										user_details: userDetails,
									});
								})
								.catch((err) => {
									res.json({
										isRegistered: true,
										position: "error",
										user_details: "Faculty Not Saved - DB Error",
									});
								});
						} else {
							res.json({
								isRegistered: false,
								position: "faculty",
								user_details: userDetails,
							});
						}
					})
					.catch((err) => {
						res.json({
							isRegistered: false,
							position: "error",
							user_details: "Faculty Not Found",
						});
					});
			} else {
				const rollno = email[0];
				Student.findOne({ email: userDetails.email })
					.then((user) => {
						if (user) {
							if (!user.isRegistered) {
								user.google_id.idToken = userDetails.idToken;
								user.google_id.id = id;
								user.isRegistered = true;
							} else {
								user.google_id.idToken = userDetails.idToken;
							}

							user
								.save()
								.then((result) => {
									res.json({
										isRegistered: true,
										position: "student",
										user_details: userDetails,
									});
								})
								.catch((err) => {
									res.json({
										isRegistered: true,
										position: "error",
										user_details: "Student Not Saved - DB Error",
									});
								});
						} else {
							res.json({
								isRegistered: false,
								position: "student",
								user_details: userDetails,
								msg:
									"Your name was not in the list of students provided by the co-ordinator. Please contact your stream co-ordinator.",
							});
						}
					})
					.catch((err) => {
						res.json({
							isRegistered: false,
							position: "error",
							user_details: userDetails,
							msg: "Invalid google account",
						});
					});
			}
		})
		.catch((err) => {
			console.log(err);
			res.json({
				isRegistered: false,
				position: "login-error",
				user_details: "Server Error",
			});
		});
});

router.get("/details/:id", (req, res) => {
	const id = req.params.id;
	const idToken = req.headers.authorization;

	oauth(idToken)
		.then((user) => {
			const User = {
				name: user.name,
				email: user.email,
			};

			const email = user.email.split("@");
			if (superAdmins.includes(user.email)) {
				res.json({
					position: "super_admin",
					user_details: User,
				});
			} else if (email[1] === "smail.iitpkd.ac.in") {
				res.json({
					position: "student",
					user_details: User,
				});
			} else if (email[1] === "iitpkd.ac.in") {
				res.json({
					position: "faculty",
					user_details: User,
				});
			}
		})
		.catch((err) => {
			res.json({
				position: "error",
				user_details: err,
			});
		});
});

module.exports = router;
