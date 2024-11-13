const express = require('express');
const {test_master,errorHendlar}= require('../models/index');
const ApiResponse = require('./apiResponse/apiResponse');
const router = express.Router();



router.get('/testlist',async(req,res)=>{
    try{

         const data = await test_master.findAll()
         res.json(new ApiResponse(true, {data},"test list found"))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false, err, "teas list data not found"))
    }
});
router.post('/testadd', async (req, res) => {
    const { test_name, test_mini_value, test_max_value, range_description } = req.body;
    try {
        const newTestMaster = await test_master.create({
            test_name,
            test_mini_value,
            test_max_value,
            range_description
        });
        res.status(201).json(new ApiResponse(true, newTestMaster, 'Test master created successfully'));
    } catch (err) {
        console.error(err);
        res.status(500).json(new ApiResponse(false, null, 'Failed to create test master'));
    }
});
router.put('/updatetest',async(req,res)=>{
    try{

    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false,err,))

    }
})

module.exports = router
