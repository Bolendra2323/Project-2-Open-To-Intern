const internModel = require("../models/internModel");

const createIntern = async function(req, res) {
    try {
        let requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: "please Provide Intern Details" })
        }


        if (!isValidField(requestBody.name)) {
            res.status(400).send({ status: false, message: "Name is Required" })
        }



        if (!isValidField(requestBody.email)) {
            res.status(400).send({ status: false, message: "Email is Required" })
        }



        if (!isValidField(requestBody.mobile)) {
            res.status(400).send({ status: false, message: "Mobile Number is Required" })
        }


        if (!isValidEmail(requestBody.email)) {
            res.status(400).send({ status: false, message: "Enter Valid email Id" })
        }

        if (!isValidField(requestBody.name.college)) {
            res.status(400).send({ status: false, message: "Name is Required" })
        }


        if (!isValidObjectId(requestBody.collegeId)) {
            res.status(400).send({ status: false, message: "Valid ID is required" })
        }


        var val = number.value
        if (/^\d{10}$/.test(val)) {
            // value is ok, use it
        } else {
            alert("Invalid number; must be ten digits")
            number.focus()
            return res.status(400).send({ status: false, message: "Enter Valid Mobile Number" })
        }
        // d means "digit,"
        // and { 10 }
        // means "ten times."
        // The ^ and $ anchor it to the start and end, so something like asdf1234567890asdf does not match.

        const collegeId = await collegeModel.findOne({ name: requestBody.name.college })
        if (!collegeId) {
            return res.status(400).send({ status: false, message: "College Name not found" })
        }

        if (collegeId.isDeleted === true) {
            return res.status(400).send({ status: false, message: "Invalid field in request body" })
        }

        const createIntern = await internModel.create(requestBody)
        return res.status(201).send({ status: true, message: "Created" })
    } catch (err) {
        res.status(500).send({ status: false, data: createIntern, message: err.message });
    }
};