 const express = require('express');
 const{test_prescription,errorHendlar} = require('../models');
const ApiResponse = require('./apiResponse/apiResponse');
 const router = express.Router();
 const moment = require('moment')

 router.post('/save',async(req,res)=>{
     const currentDate = new Date();
    const {Test_result,test_id,prescription_id,doctor_remark}=req.body
    try{
        const test = await test_prescription.create(

     {Date_of_prescription:moment(currentDate).format('DD-MM-YYYY'),
      Test_result,test_id,prescription_id,doctor_remark}

        );
        res.json(new ApiResponse(true,test,"test prescription data saved"))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false,err,"test data not save "))
    }
 });
 router.get('/list',async(req,res)=>{
    try{
      const data = await test_prescription.findAll();

      res.json(new ApiResponse(true,data,"data found successfuly "))
       }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false,err,"invailide"))
      }
 });
 router.put('/update/:id',async(req,res)=>{
   const patient_test_id= req.params.id ;
   const{Date_of_prescription,Test_result,test_id,prescription_id,doctor_remark}=req.bpdy
   try{
     const test = await test_prescription.update(
      {Date_of_prescription,Test_result,test_id,prescription_id,doctor_remark},
      {where:{patient_test_id}}
     )
     res.json(new ApiResponse(true,test,"test data delete successfuly"))
   }catch(err){
      console.error(err);
      const error = errorHendlar(err);
      res.json(new ApiResponse(false,err,"test not updated "))
   }
 })
 router.delete('/delete/:id',async(req,res)=>{
   const patient_test_id = req.params.id
   try{
       const test = await test_prescription.findByPk({patient_test_id})
       if(test == null){
         res.json(new ApiResponse(true,test,"data not found"))
       }
       else{
         await test.Destroy()
         res.json(new ApiResponse(true,test,"data delete successfuly"))
       }
   }catch(err){
      console.error(err);
      const error = errorHendlar(err);
      res.json(new ApiResponse(false,err,"test not delete "))
   }
 });
 module.exports = router;