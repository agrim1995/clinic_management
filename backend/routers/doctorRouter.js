const express = require('express');
const {Doctor, errorHendlar,Staff,User,sequelize}= require('../models/index');
const ApiResponse = require('./apiResponse/apiResponse');
const router = express.Router();
//const { Model, Transaction } = require('sequelize');


router.post('/adddoctor',async(req,res)=>{
    const  t = await sequelize.transaction();
    
    const {name,designation,salary,clinic_id
        ,phone,email,password,degree,gender,
        specialty,address,experience,
        available_days,available_time,
        } = req.body
        //console.log(req.body)
    try{
        const user = await User.create(
         {
          name,phone,email,password,degree,
       },{transaction:t}
        )
        const staffdata = await Staff.create({
            name,designation,salary,clinic_id
            ,user_id:user.user_id,clinic_id
            ,phone,email,gender
          },{transaction:t})
          
        const doctor = await Doctor.create(
            {specialty,address,experience,available_days,available_time,doctor_user_id:user.user_id},{transaction:t}
        )
        await t.commit();
        res.json(new ApiResponse(true,{doctor,user,staffdata},"doctor data successfuly saved"))

    }catch(err){
        await t.rollback()
        console.error(err);
        const error= errorHendlar(err);
        res.json(new ApiResponse(false,err,"doctor data not saved "))
    }
})
router.get('/list',async(req,res)=>{
    try{
        const doctor = await Doctor.findAll({
            attributes: { exclude: ["doctor_user_id",] },
            include: [{
                model: User,
                as :"user",
             attributes: { exclude: ['password', 'active_status'] } 
            }]
    });
    
     res.json(new ApiResponse(true , {doctor},"doctor details found successfuly "))
    }catch(err){
      console.error(err);
      const error = errorHendlar(err);
      res.json(new ApiResponse(false,err,"data not found "))
    }
});

router.put('/update/:id',async(req,res)=>{
    const doctor_id = req.params.id
    const {specialty,address,experience,available_days,available_time,doctor_user_id}= req.body
    try{
        const update= await Doctor.update(

         {specialty,address,experience,available_days,available_time,doctor_user_id}
        ,{where:{doctor_id}}
        )

         res.json(new ApiResponse(true,update,"doctor details  updated"))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false,err,"doctor details not updated"))
    }
});
router.delete('/delete/:id',async(req,res)=>{
    const doctor_id= req.params.id
  try{
       const data = await Doctor.findByPk(doctor_id)

       await data.destroy();
       res.json(new ApiResponse(true , data,"data deleted successfuly"))
  }catch(err){
    console.error(err);
    const error = errorHendlar(err);
    res.json(new ApiResponse(false, err, "data not deleted "))
  }
})

module.exports=router