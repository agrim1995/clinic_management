const express = require('express');
const {role_master, errorHendlar} = require('../models');
const ApiResponse = require('./apiResponse/apiResponse');
const router= express.Router();


router.get('/rolelist',async(req,res)=>{

    try{

        const rolelist = await role_master.findAll();

        res.json(new ApiResponse(true, {rolelist}, "role data find successfuly "))

    }catch(err){
        console.error(err);
        const error = errorHendlar;
        res.json(new ApiResponse(false, err, " data note found"))
    }
})
router.post('/addrole',async(req,res)=>{
    const {role_name,description}=req.body
    console.log(req.body)
    try{
        const role = await role_master.create({role_name,description});
        res.json(new ApiResponse(true , {role }, " role data saved "))
    }catch(err){
      console.error(err);
      const error = errorHendlar(err);
      res.json(new ApiResponse(false, " data not saved"))
    }
})




module.exports = router;