const collegeModel = require('../models/collegeModel');

const createCollege = async function(req,res)
{
    try
    {
        const reqBody = req.body;
        
    }
    catch(err)
    {
        res.status(500).send({status : false,message : err.message});
    }
};

module.exports={createCollege};