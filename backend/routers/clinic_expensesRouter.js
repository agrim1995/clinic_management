const express = require("express");
const {Clinic_expenses , errorHendlar}= require('../models/index');
const ApiResponse = require("./apiResponse/apiResponse");
const { where } = require("sequelize");
//const jwt = require('../config/Tokenmanage')
const router = express.Router();


router.get('/details',async(req , res)=>{
    try{
        const expens = await Clinic_expenses.findAll();
        res.json( new ApiResponse(true,expens,"data found successfuly"))

    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json( new ApiResponse(false,err,"data not found"))
    }
})

router.post('/addexpense',async(req,res)=>{
    
    const entered_by = req.user
   const {clinic_id,expense_by,item_name,amount,expense_date}= req.body
    try{
  const expens = await Clinic_expenses.create({
    clinic_id,expense_by,item_name,amount,expense_date,entered_by:entered_by
  })
  res.json( new ApiResponse(true,{expens},"data saved "))
    }catch(err){
        console.error(err);
        const error= errorHendlar(err);
        res.json( new ApiResponse(false,err,"expenses not add "))
    }
})


router.put('/updateexpense/:id',async(req,res)=>{
    const id = req.params.id
   const {clinic_id,expense_by,item_name,amount,expense_date}= req.body
    try{
  const expens = await Clinic_expenses.update({
    clinic_id,expense_by,item_name,amount,expense_date
  },{where:{expense_id:id}})

  res.json( new ApiResponse(true,{expens},"data updated "))
    }catch(err){
        console.error(err);
        const error= errorHendlar(err);
        res.json( new ApiResponse(false,err,"expenses not update "))
    }
})

router.delete('/deleteexpense/:id',async(req,res)=>{
    const id = req.params.id
    
    try{
     const data = await Clinic_expenses.findByPk(id)

     await data.destroy()
     res.json( new ApiResponse(true , data, " data deleted successfuly"))
    }catch(err){
     console.error(err);
     const error= errorHendlar(err);
     res.json( new ApiResponse(false , err, "data not delete "))
    }
})

module.exports = router
