const express = require('express')
const {User,errorHendlar, user_role,role_master,Staff,sequelize} = require('../models/index');
const doctor = require('../models/doctor');
const router = express.Router()
const ApiResponse =require('./apiResponse/apiResponse');
const moment = require('moment');
const jwt = require('../config/Tokenmanage');

router.post("/save",async (req, res)=>{

  
    const email = await User.findOne({ where: { email: req.body.email } });
    const phone = await User.findOne({ where: { phone: req.body.phone } });

    if (email && req.body.email === email.email) {
        return res.json({ message: "Email is already registered" });
    }

    if (phone && req.body.phone === phone.phone) {
        return res.json({ message: "Phone number is already registered" });
    }
  const  t = await sequelize.transaction()
   const currentDate = new Date();
    try{
    const user= await User.create( {    
        "name":req.body.name,
        "phone":req.body.phone,
        "email":req.body.email,
        "password":req.body.password,
        "gender": req.body.gender,
        "degree":req.body.degree,
    },{transation:t});

    const userrole = await user_role.create({
      "assign_date":moment(currentDate).format('DD-MM-YYYY'),
          "user_id": user.user_id,
          "role_id": req.body.role_id,
          "assign_by":req.body.assign_by,
          "COMMENT":req.body.COMMENT
      },{transation:t});
      
      const id = req.body.staff_id;
      const updatedStaff = await Staff.update(
        {
          clinic_id: req.body.clinic_id,
          user_id: user.user_id
        },{ where: {staff_id: id },transaction: t})

         await t.commit();

        res.json(new ApiResponse(true,{user,userrole,updatedStaff },"user details saved !"));
      
       }catch (err) {
        await t.rollback()
        console.log(err);
        var error = errorHendlar(err)
        res.json(new ApiResponse(false, error, "user not saved !"));
         }
});

router.get("/list", async (req,res)=> {
      try{
        const user = await User.findAll({
          include: [{
            model: user_role,
            as: 'user_roles',
           // attributes:['role_id']

           include:[
            {
            model:role_master,
            as:'rolename',
            attribules:['role_name']

           } ]
         }],
          
        })
        
        res.json(new ApiResponse(true , user, " all user list !"));
   
      }catch(err){
        const error =errorHendlar(err)
        res.json(new ApiResponse(false, error," user not found "))
        console.log(err)
      }
});
router.put('/block/:id', async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.json(new ApiResponse(false, null, "User not found"));
    }
    if (user.active_status === true) {
      return res.json(new ApiResponse(true, "User is already blocked"));
    }
    user.active_status = true;
    await user.save();
    res.json(new ApiResponse(true, "User blocked successfully"));
  } catch (err) {
    console.error(err);
    const error = errorHandler(err);
    res.json(new ApiResponse(false, err, "User not blocked"));
  }
});

router.put('/unblock/:id', async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.json(new ApiResponse(false, null, "User not found"));
    }

    if (user.active_status === false) {
      return res.json(new ApiResponse(true, "User is already unblocked"));
    }

    user.active_status = false;
    await user.save();
    res.json(new ApiResponse(true, "User unblocked successfully"));
  } catch (err) {
    console.error(err);
    const error = errorHandler(err);
    res.json(new ApiResponse(false, err, "User not unblocked"));
  }
});
router.put('/update/:id', async (req, res) => {
  const user_id = req.params.id; // Access the user ID from request parameters
  try {
    const user = await User.update({
      "name": req.body.name,
      "phone": req.body.phone,
      "email": req.body.email,
      "password": req.body.password,
      "gender": req.body.gender,
      "degree": req.body.degree
    },
    { where: { user_id } });

    if (user[0] === 0) { 
      return res.json(new ApiResponse(false, null, "User not found"));
    }

    res.json(new ApiResponse(true, user, "Data updated successfully"));
  } catch (err) {
    console.error(err);
    const error = errorHendlar(err)
    res.json(new ApiResponse(false, err, "User data not updated"));
  }
});
router.delete('/delete/:id',async(req,res)=>{
       const user_id= req.params.id
  try{ 
    const data = await User.findByPk(user_id);

    await data.destroy()


    res.json(new ApiResponse(true,{daat},"user data deleted successfuly"))

  }catch(err){
     console.error(err);
     const error= errorHendlar(err);
     res.json(new ApiResponse(false , err,"user not delete"))
  }
})

module.exports = router