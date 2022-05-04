const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const internController = require("../controllers/internController");

router.get("/test-me", function(req, res) {
    res.send("Let's start!!!")
});

router.post('/functionup/interns', internController.internCreate);

module.exports = router;