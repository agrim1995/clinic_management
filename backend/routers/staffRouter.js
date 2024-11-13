const express = require('express');
const{Staff,User, errorHendlar} = require('../models');
const ApiResponse = require('./apiResponse/apiResponse');
const { where, Model } = require('sequelize');
const router = express.Router();


router.post('/save',async(req,res)=>{
    const {name,designation,salary,clinic_id,user_id,phone,email,gender}=req.body
    try{
          const staffdata = await Staff.create({
            name,designation,salary,clinic_id,user_id,phone,email,gender
          })
       res.json( new ApiResponse( true,staffdata,"staff data saved"));
    }catch(err){
         console.error(err);
         const error = errorHendlar(err);
         res.json( new ApiResponse(false,err,"staff data not saved"));
    }
});

router.get('/list', async (req, res) => {
   try {
      const staffList = await Staff.findAll({
         include: [{
            model: User,
            as: 'user',
            attributes: [ "active_status"]
         }]
      });

      res.json(new ApiResponse(true, staffList, "Staff data found successfully"));
   } catch (err) {
      console.error(err);
      const error = errorHandler(err); // Corrected typo: errorHendlar to errorHandler
      res.json(new ApiResponse(false, error, "Staff data not found"));
   }
});

router.put('/update/:id',async(req,res)=>{
    const staff_id = req.params.id
    const {name,designation,salary,clinic_id,user_id,phone,email}=req.body
    try{
        const staff = await Staff.update({name,designation,salary,clinic_id,user_id,phone,email},
            {where:{staff_id}}
        )
        res.json(new ApiResponse(true , {staff}, "staff data updated successfuly "))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false, err, "staff data not updated "))
    }
});
router.delete('/delete/:id',async(req,res)=>{
    const staff_id = req.params.id
    try{
        const staff = await Staff.findByPk(staff_id)

        await  staff.destroy();
        res.json(new ApiResponse(true,staff,"staff data deleted "))
    }catch(err){
        console.error(err);
        const error = errorHendlar(err);
        res.json(new ApiResponse(new ApiResponse(false,err,"staff data not deleted ")))
    }
});

module.exports = router;