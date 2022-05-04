const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const validators = require('../validators/validator');

const createCollege = async function(req,res)
{
    try
    {
        if(!validators.isValidRequestBody(req.body))

            return res.status(400).send({status : false, message : "Invalid request body. Please provide college details."});

        let {name, fullName, logoLink} = req.body;
        if(!validators.isValidField(name))

            return res.status(400).send({status : false, message : "Name is required."});

        let college = await collegeModel.findOne(name);
        if(college!=null)

            return res.status(400).send({status : false, message : "This name is already in use."});

        if(!validators.isValidField(fullName))

            return res.status(400).send({status : false, message : "Full Name is required."});

        if(!validators.isValidField(logoLink))

            return res.status(400).send({status : false, message : "Logo Link is required."});

        if(req.body.isDeleted!=undefined)

            return res.status(400).send({status : false, message : "Invalid field (isDeleted) in request body."});
        
        const collegeData = {name,fullName,logoLink};
        const newCollege = await collegeModel.create(collegeData);
        res.status(201).send({status : true, data : newCollege});
    }
    catch(err)
    {
        res.status(500).send({status : false,message : err.message});
    }
};

const listInterns = async function (req,res)
{
    try
    {
        if(!req.query.collegeName)
    
            return res.status(400).send({status : false, message : "Invalid request parameter. Please provide collegeName."});

        const collegeId = await collegeModel.findOne({name : req.query.collegeName,isDeleted : false},{_id : 1});
        if(collegeId==null)

            return res.status(404).send({status : false, message : "College not found!"});
        const interns = await internModel.find({collegeId : collegeId,isDeleted : false});
        if(interns.length==0)

            return res.status(404).send({status : true, message : "No interns found."});

        res.status(200).send({status : true, data : interns});
    }
    catch(err)
    {
        res.status(500).send({status : false, message : err.message});
    }
}

module.exports={createCollege,listInterns};