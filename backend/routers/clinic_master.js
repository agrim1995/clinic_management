const express = require('express')
const {clinic_master,errorHendlar} = require('../models/index')
const ApiResponse = require('./apiResponse/apiResponse')
const router = express.Router()


router.post("/", (req, res)=>{
    

})
router.get('/clinicdetails',async(req,res)=>{
   try{ 
    const clinicdata = await clinic_master.findAll()
    res.json(new ApiResponse(true, {clinicdata},"clinic data found successfuly"))
   }catch(err){
    console.error(err);
    const error = errorHendlar(err);
    res.json(new ApiResponse(false,err,"data not found "))
   }
})
router.delete('/remove/:id',async(req,res)=>{
    const clinic_id = req.params.id
    try{
        const data = await clini_master.findByPk(clinic_id);
        await data.destroy();
        res.json( new ApiResponse(true, data,"clinic data deleted successfuly"))

    }catch(err){
        console.error(err);
        const error = errorHendlar(err)
        res.json(new ApiResponse(false,error,"data not delete "))
    }
})
module.exports = router