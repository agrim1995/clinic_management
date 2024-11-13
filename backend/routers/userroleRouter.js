const express= require('express');
const {user_role, errorHendlar}=require('../models');
const router = express.Router();
const ApiResponse = require('./apiResponse/apiResponse');
const moment = require('moment');

router.post('/save',async(req,res)=>{
    const currentDate = new Date();
    try{
        const userrole = await user_role.create({
        "assign_date":moment(currentDate).format('DD-MM-YYYY'),
            "user_id": req.body.user_id,
            "role_id": req.body.role_id,
            "assign_by":req.body.assign_by,
            "COMMENT":req.body.COMMENT
        });
        res.json(new ApiResponse(true, userrole,"user role data saved"))

    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false,error,"role data not saved"))
    }
});
router.get('/list',async(req,res)=>{
    try{
        const userdata = await user_role.findAll();

        res.json(new ApiResponse(true ,userdata,"user role data found "));
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json( new ApiResponse(false ,err,"role data not found"))
    }
});


module.exports= router