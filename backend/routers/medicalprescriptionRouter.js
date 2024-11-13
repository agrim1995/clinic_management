const express = require('express');
const {medical_prescription, errorHendlar}= require('../models/index');
const ApiResponse = require('./apiResponse/apiResponse');
const { where } = require('sequelize');
const router = express.Router();

router.post('/add',async(req,res)=>{
    const {medicine_name,dosage,frequency,duration_day,doctor_remark,prescription_id}=req.body
    try{
        const medicaldata = await medical_prescription.create(
            {medicine_name,dosage,frequency,duration_day,doctor_remark,prescription_id}
        )
        res.json(new ApiResponse(true,medicaldata,"medical prescription successfully add"))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false, err, "invalid credential"))
    }
});
router.get('/list',async(req,res)=>{
    try{
        const medicin = await medical_prescription.findAll();
        res.json(new ApiResponse(true , medicin, "medicine find successfuly"))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, err ,"data note found"))
    }
});
router.put('/update/:id',async(req,res)=>{
    const medicine_id = req.params.id;
    const{medicine_name,dosage,frequency,duration_day,doctor_remark,prescription_id} =req.body
    try{
        const medical= await medical_prescription.update(
            {medicine_name,dosage,frequency,duration_day,doctor_remark,prescription_id},
            {where:{medicine_id}}
        )
        if (medical>0){
            const medicinedata = await medical_prescription.findAll({where:{medicine_id}})
            res.json(new ApiResponse(true,medicinedata,"medicine data updated successfuly"))
        } 
        else{
        res.json(new ApiResponse(true, medical,"no medicine data updated"))
        }
    }catch(err){
     console.error(err);
     const error = errorHendlar(err);
     res.json(new ApiResponse(false, err, "medicine data not update"))
    }
});
router.delete('/delete/:id',async(req,res)=>{
    const medicine_id = req.params.id
    try{
        const data = await  medical_prescription.findByPk(medicine_id);
        console.log(data)
        await data.destroy();

        res.json(new ApiResponse(true ,data , "data successfuly deleted"))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false , err,"data not delete "))
    }
})
module.exports = router