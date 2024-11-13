const express = require("express");
const { Prescription, errorHendlar} = require("../models/index");
const ApiResponse = require("./apiResponse/apiResponse");
const moment = require('moment');
const { where } = require("sequelize");
const router = express.Router();



router.post("/prescriptionadd", async (req, res) => {
    const currentDate = new Date();
    console.log("Request body:", req.body);

    // Validate the request body for required fields
    if (!req.body.symptoms || !req.body.diseases || !req.body.doctor_id || !req.body.visit_id) {
        return res.json(new ApiResponse(false, null, "Missing required fields"));
    }

    try {
        const prescription = await Prescription.create({
            symptoms: req.body.symptoms,
            observation: req.body.observation,
            diseases: req.body.diseases,
            next_visit_date: moment(currentDate).format('YYYY-MM-DD'),
            advice: req.body.advice,
            doctor_id: req.body.doctor_id,
            visit_id: req.body.visit_id
        });

        res.json(new ApiResponse(true, prescription, "Prescription details saved!"));
    } catch (err) {
        console.error("Prescription creation error:", err);
        const error = errorHendlar(err);  // Ensure this function is properly implemented
        res.json(new ApiResponse(false, error, "Prescription details not saved!"));
    }
});


router.get('/list',async(req,res)=>{
try{
    const prescriptionlist = await Prescription.findAll();
    res.json(new ApiResponse(true , prescriptionlist, 'data found successfuly '))
}catch(err){
console.error(err);
const error = errorHendlar(err);
res.json(new ApiResponse(false,err, "data not found"))
}
})

router.put('/update/:id',async(req,res)=>{
    try{
        const data = await Prescription.update(
            {
                "symptoms": req.body.symptomps,
                "observation":req.body.observation,
                "diseases": req.body.diseases,
                "next_visit_date": moment(currentDate).format('YYYY-MM-DD'),
                "advice":req.body.advise,
                "doctor_id":req.body.doctor_id,
                "visit_id":req.body.visit_id
           },{where:{prescription_id:id}}
        )

    }catch(err){
      console.error(err);
      const error = errorHendlar(err);
      res.json(new ApiResponse(false,err,"data not update "))
    }
})

// router.post("/test",(req,res) =>{
        
//      console.log(req.body)
// try{

//     const testprescription = test_prescription.create({
            
//             "Date_of_prescription": req.body.Date_of_prescription,
//             "Test_result": req.body.Test_result,
//             "prescription_id": req.body.prescription_id,
//             "test_id":req.body.test_id,
//             "doctor_remark":req.body.doctor_remark
        
//     })
//  res.json(new ApiResponse(true,testprescription,"test detailed saved"))
// }catch(err){
//     var error =errorHendlar(err)
//     res.json(new ApiResponse(false,error,"test detailed not save "))
// }
// })
router.post("/medical",(req,res) =>{
        
     console.log(req.body)
try{

    const medicalprescription = medical_prescription.create({

             "medicine_name": req.body.medicine_name,
             "dosage":req.body.dosage,
             "frequency":req.body.frequency,
             "duration in day":req.body.duration_day,
             "doctor_remark": req.body.doctor_remark,
             "prescription_id":req.body.prescription_id
            
            

        
    })
 res.json(new ApiResponse(true,medicalprescription,"medical detailed saved"))
}catch(err){
    var error =errorHendlar(err)
    res.json(new ApiResponse(false,error,"medical detailed not save "))
}
})

module.exports = router;