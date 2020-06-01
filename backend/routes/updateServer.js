const express = require("express");
const router = express.Router();
const cp = require("child_process");
const path = require("path");

router.post("/:build", (req, res) => {
	const param = req.params.build;
	var file_path = path.resolve(
		__dirname,
		`../../Build-Script/build.sh ${param}`
	);
	cp.exec(file_path, (err, stdout, stderr) => {
		res.json({
			out: stdout,
			err: stderr,
		});
	});
});

module.exports = router;