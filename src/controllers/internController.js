const collegeModel = require('../models/collegeModel');
const internModel = require("../models/internModel");
const validators = require('../validators/validator');


const createIntern = async function(req, res) 
{
    try 
    {
        let requestBody = req.body

        if (!validators.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "please Provide Intern Details" })
        }


        if (!validators.isValidField(requestBody.name)) {
            return res.status(400).send({ status: false, message: "Name is Required" })
        }



        if (!validators.isValidField(requestBody.email)) {
            return res.status(400).send({ status: false, message: "Email is Required" })
        }



        if (!validators.isValidField(requestBody.mobile)) {
            return res.status(400).send({ status: false, message: "Mobile Number is Required" })
        }


        if (!validators.isValidEmail(requestBody.email)) {
            return res.status(400).send({ status: false, message: "Enter Valid email Id" })
        }

        if (!validators.isValidField(requestBody.collegeName)) {
            return res.status(400).send({ status: false, message: "collegeName is Required" })
        }

        let college = await collegeModel.findOne({ name: requestBody.collegeName }, { _id: 1 })
        if (college == null) {
            return res.status(400).send({ status: false, message: "college not found" })
        }



        var val = requestBody.mobile
        if (/^\d{10}$/.test(val)) {
            // value is ok, use it
        } else {
            alert("Invalid number; must be ten digits")
            val.focus()
            return res.status(400).send({ status: false, message: "Enter Valid Mobile Number" })
        }
        // d means "digit,"
        // and { 10 }
        // means "ten times."
        // The ^ and $ anchor it to the start and end, so something like asdf1234567890asdf does not match.

        requestBody['collegeId']=college._id;
        const createIntern = await internModel.create(requestBody)
        return res.status(201).send({ status: true, message: "Created",data : createIntern })
    } 
    catch (err) 
    {
        res.status(500).send({ status: false, data: createIntern, message: err.message });
    }
};
module.exports.createIntern = createIntern