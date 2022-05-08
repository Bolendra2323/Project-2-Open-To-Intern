const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const validators = require('../validators/validator');

const createCollege = async function(req, res) {
    try {
        let collegeData = req.body;
        if (!validators.isValidRequestBody(req.body))

            return res.status(400).send({ status: false, message: "Invalid request body. Please provide college details." });

        if (!validators.isValidField(collegeData.name))

            return res.status(400).send({ status: false, message: "Name is required." });

        let college = await collegeModel.findOne({ name: collegeData.name });
        if (college !== null)

            return res.status(400).send({ status: false, message: "This name is already in use." });

        if (!validators.isValidField(collegeData.fullName))

            return res.status(400).send({ status: false, message: "Full Name is required." });

        if (!validators.isValidField(collegeData.logoLink))

            return res.status(400).send({ status: false, message: "Logo Link is required." });

        if (!validators.isValidURL(collegeData.logoLink))

            return res.status(400).send({ status: false, message: "Logo Link is invalid." });

        if (collegeData.isDeleted != undefined)

            return res.status(400).send({ status: false, message: "Invalid field (isDeleted) in request body." });

        let newCollege = await collegeModel.create(collegeData);
        let { name, fullName, logoLink } = newCollege;
        res.status(201).send({ status: true, data: { name, fullName, logoLink } });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

const listInterns = async function(req, res) {
    try {
        if (!req.query.collegeName)

            return res.status(400).send({ status: false, message: "Invalid request parameter. Please provide collegeName." });

        let college = await collegeModel.findOne({ name: req.query.collegeName, isDeleted: false }, { name: 1, fullName: 1, logoLink: 1 });
        if (college === null)

            return res.status(404).send({ status: false, message: "College not found!" });

        const interns = await internModel.find({ collegeId: college._id, isDeleted: false }, { __v: 0, isDeleted: 0, collegeId: 0 });
        if (interns.length === 0)

            return res.status(404).send({ status: true, message: "No interns found." });

        res.status(200).send({ status: true, data: { name: college.name, fullName: college.fullName, logoLink: college.logoLink, interests: interns } });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = { createCollege, listInterns };