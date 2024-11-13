const express = require('express');
const { Patient,Doctor, User,errorHendlar,Appointment, sequelize } = require('../models/index');
const ApiResponse = require('./apiResponse/apiResponse');
const router = express.Router()
const moment = require('moment');
const jwt = require('../config/Tokenmanage');
const { Model } = require('sequelize');


// router.post("/addpatient", async (req, res) => {

//   const empid = req.user
//   const t = await sequelize.transaction();
//   const{symptoms,allergy,appointment_status,doctor_id,appointment_date_time }=req.body

//     try{
//     if (req.body.patient_id){
//         const appointment = await Appointment.findOne({where:{patient_id:req.body.patient_id}})
//         const _id =appointment.visit_id
//         const appoint = await Appointment.update(
//             {  appointment_date_time,
//                 symptoms, allergy, appointment_status, doctor_id, added_by: empid},
//             { where: { visit_id:_id}}
//         );
//         res.json(new ApiResponse(true , {appoint},"appointment booked successfuly"))
//       }
//       else{
//         const email = await Patient.findOne({ where: { email: req.body.email } });
//         const phone = await Patient.findOne({ where: { phone: req.body.phone } });

//         if (email && req.body.email === email.email) {
//             return res.json({ message: "Email is already use please enter different email" });
//         }
    
//         if (phone && req.body.phone === phone.phone) {
//             return res.json({ message: "Phone number is already use please enter different number" });
//         }
//             const patient = await Patient.create({
//                 "name": req.body.name,
//                 "phone": req.body.phone,
//                 "email":req.body.email,
//                 "age": req.body.age,
//                 "gender": req.body.gender,
//                 "blood_group": req.body.blood_group
//             },{transaction:t})

//             const appointment = await Appointment.create(
//                 {appointment_date_time
//                  ,symptoms,allergy,
//                  appointment_status,
//                  patient_id:patient.patient_id,
//                  added_by: empid
//                 ,doctor_id},{transaction:t} );

//             await t.commit();
//             res.json(new ApiResponse(true, {patient,appointment}, "patient detail is saved","patient"))
//             }    
//     } catch (err) {
//         await t.rollback()
//         console.error(err)
//         var error = errorHendlar(err)
//         res.json(new ApiResponse(false, error, "patient detailed not saved !","patient"))

//     }
//  });

router.post("/addpatient", async (req, res) => {
    const empid = req.user;
    const t = await sequelize.transaction();
    const { symptoms, allergy, appointment_status, doctor_id, appointment_date_time, patient_id, email, phone, name, age, gender, blood_group } = req.body;
  
    console.log("Received request body:", req.body);
  
    try {
      if (patient_id) {
        const appointment = await Appointment.findOne({ where: { patient_id } });
  
        if (!appointment) {
          await t.rollback();
          return res.status(404).json(new ApiResponse(false, null, "Appointment not found"));
        }
  
        const _id = appointment.visit_id;
        const appoint = await Appointment.update(
          { appointment_date_time, symptoms, allergy, appointment_status, doctor_id, added_by: empid },
          { where: { visit_id: _id }, transaction: t }
        );
  
        await t.commit();
        return res.status(200).json(new ApiResponse(true, { appoint }, "Appointment successfully updated"));
      } else {
        const emailExists = await Patient.findOne({ where: { email }, transaction: t });
        const phoneExists = await Patient.findOne({ where: { phone }, transaction: t });
  
        if (emailExists) {
          await t.rollback();
          return res.status(400).json(new ApiResponse(false, null, "Email is already in use, please enter a different email"));
        }
  
        if (phoneExists) {
          await t.rollback();
          return res.status(400).json(new ApiResponse(false, null, "Phone number is already in use, please enter a different number"));
        }
  
        const patient = await Patient.create(
          {
            name,
            phone,
            email,
            age,
            gender,
            blood_group
          },
          { transaction: t }
        );
  
        const appointment = await Appointment.create(
          {
            appointment_date_time,
            symptoms,
            allergy,
            appointment_status,
            patient_id: patient.patient_id,
            added_by: empid,
            doctor_id
          },
          { transaction: t }
        );
  
        await t.commit();
        return res.status(201).json(new ApiResponse(true, { patient, appointment }, "Patient details successfully saved", "patient"));
      }
    } catch (err) {
      await t.rollback();
      console.error("Error occurred:", err);
      if (err.original && err.original.code === '10028') {
        console.error('Specific error code 10028:', err.original);
      }
      const error = errorHendlar(err);
      return res.status(500).json(new ApiResponse(false, error, "Patient details could not be saved", "patient"));
    }
  });
  
  
router.get("/list", async (req, res) => {
    try { 
        const patients = await Patient.findAll({
            include:[{
                model: Doctor,
                as : "doctor detailse"

            ,include:[{
                model:User,
                as :"user",
                attributes:["name"]
            }]
             }
            ]
         });
       
        res.json(new ApiResponse(true, patients, "patients list", "patient")); 
    } catch (err) {
        const error = errorHendlar(err);
        res.json(new ApiResponse(false, error, "could not find", "patient"));
        console.log(err);
    }
});

router.get('/serch',async(req,res)=>{
    const{patient_id,name,mobile,email}=req.query
    console.log("patient data is ",req.query)
    try{
        
        
    let patientdata = null;
if(name){
     patientdata = await Patient.findAll({where:{name:name}});
}
if(patient_id){
    patientdata = await Patient.findOne({where:{patient_id:patient_id}});
    }
if(mobile){
    patientdata = await Patient.findOne({where:{phone:mobile}})
}
if(email){
    patientdata = await Patient.findOne({where:{email:email}})
}
if(patientdata === null){

    res.json(new ApiResponse("data not found please enter valid input"))
}
else{
res.json( new ApiResponse(true,{patientdata},"patient data find successfuly"))
}
    }catch(err){
     console.error(err);
     const error = errorHendlar(err);
     res.json( new ApiResponse(false,err,"data not found"))
    }
})
router.delete("/delete/:id", async (req, res) => {
    try {
        var patient_id = req.params.id
        var patients = await Patient.findOne({ where: { patient_id } })
        if (patients == null)
            res.json(new ApiResponse(false, null, "patient not found"))
        else
            patients.destroy()
        res.json(new ApiResponse(true, patients, "patient deleted !","patient"))
    } catch (err) {
        var error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "patient cant be delete","patient"))
    }
});
router.put("/done/:id", async (req, res) => {
    try {
        const id = req.params.id
        var patients = await Patient.findOne({
            where: {patient_id: id },
           // include: ['address'],
           // attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        if (patients == null)
            res.json(new ApiResponse(false, null, "patient not found"))
        else
            var activeStatus = false
        var data = await Patients.update({ activeStatus })
        res.json(new ApiResponse(true, data, "patient detail update","patient"))
    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "patient cannot updated","patient"))
    }
});

router.put("/undo/:id", async (req, res) => {
    try {
        const id = req.params.id
        var patients = await patient.findOne({
            where: { id: id },
            include: ['address'],
           // attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        if (patients == null)
            res.json(new ApiResponse(false, null, "patient not found","patient"))
        else
            var activeStatus = true
        var data = await patients.update({ activeStatus })
        res.json(new ApiResponse(true, data, "patient detail update","patient"))
    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "patient cannot updated","patient"))
    }
});

router.get("/lists", async (req, res) => {

    try {
        const patients = await patient.findAll({
            where: {
                raddress: req.user
            },
            include: ['address'],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        })
        console.log(patients)
        res.json(new ApiResponse(true, patients, "patients list","patient"))
    } catch (err) {
        const error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "could not find","patient"))
    }

});

router.put("/update/:id", async (req, res) => {
    try {
        const name = req.body.name
        const appointmentdate = req.body.appointmentdate
        const phone = req.body.phone
        const patient_id = req.params.id
        const patients = await Patient.findOne({ where: { patient_id } })
        if (patients == null)
            res.json(new ApiResponse(false, null, "patient not found" ,"patient"))
        else

            var data = await patients.update({ name, phone,email })

        res.json(new ApiResponse(true, data, "patient details update !","patient"))
    } catch (err) {
        var error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "patient cant be deleted" ,"patient"))
    }
});


    module.exports = router