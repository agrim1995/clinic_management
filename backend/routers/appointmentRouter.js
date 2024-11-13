const express = require('express')
const {Appointment, errorHendlar,Patient,Doctor,User}= require('../models');
const ApiResponse = require('./apiResponse/apiResponse');
const moment = require('moment');
const { where, Model } = require('sequelize');
const router = express.Router();




router.post('/save',async(req,res)=>{
    const current = new Date();
    const{symptoms,allergy,appointment_status,patient_id,doctor_id}=req.body
try{
      const appointment = await Appointment.create(
        {appointment_date_time:moment(current).format('DD-MM-YYYY')
            ,symptoms,allergy,appointment_status,patient_id,doctor_id}
      );
      res.json(new ApiResponse(true,appointment,"appointment data saved"))
}catch(err){
    console.error(err);
    const error = errorHendlar(err);
    res.json(new ApiResponse (false,err,"appointment data not save"))
}
});
router.get('/list', async (req, res) => {
    try {
        const apointlist = await Appointment.findAll({
            include: [
                {
                    model: Patient,
                    as: "patient"
                },
                {
                    model: Doctor,
                    as: "doctor",
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["name"]
                        }
                    ]
                }
            ]
        });
        res.json(new ApiResponse(true, { apointlist }, "Data found successfully"));
    } catch (err) {
        console.error(err);
        const error = errorHendlar(err);  // Assuming you have an error handler function defined
        res.json(new ApiResponse(false, error, "Data not found"));
    }
});

// router.get('/list',async(req,res)=>{
//     try{
//         const apointlist = await Appointment.findAll({
//             include:[
//                 {
//                     model:Patient,
//                     as:"patient"
//                 }
//             //     ,
//             //       {
//             //     model: Doctor,
//             //     as : "doctordetailse"

//             //     ,
//             //     include:[{
//             //     Model:User,
//             //     as :"user",
//             //     attributes:["name"]
//             //       }
//             //    ],
//             // }
//             ]
//         });
//         res.json(new ApiResponse(true,{apointlist},"data found successfuly"));

//     }catch(err){
//         console.error(err);
//         const error= errorHendlar(err);
//         res.json(new ApiResponse(false,err,"data not found"))
//     }
// })

router.put('/update/:id',async(req,res)=>{
    const visit_id = req.params.id
    const{symptoms,allergy,appointment_status,patient_id,doctor_id}=req.body
    try{
      const appointment = await Appointment.update(
        {symptoms,allergy,appointment_status,patient_id,doctor_id},
        {where:{visit_id}}
      )
      res.json(new ApiResponse(true ,appointment,"appointment data update successfuly" ))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false,err,"appointment data not update"))
    }
});

 router.delete('/delete/:id',async(req,res)=>{
    const visit_id = req.params.id
    try{
        const data = await Appointment.findByPk(visit_id)

        await data.destroy()
        res.json(new ApiResponse(true,data , "data delete successfuly"))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false,err,"data notr delete"))
    }
 })

module.exports = router