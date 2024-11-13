const express = require('express');
const ApiResponse = require('./apiResponse/apiResponse');
const { errorHendlar ,clinic_master,User,user_role,role_master} = require('../models/index')
const jwt = require('../config/Tokenmanage');
const {Doctor,sequelize} = require('../models/index');
const router = express.Router();
const moment = require('moment')

router.post("/clinic/save", async (req, res) => {
      const role = "admin";
    const roles = await role_master.findOne({where:{role_name:role}});
   // res.send(userrole) ;
    const t = await sequelize.transaction();
    const currentDate = new Date();
      try{
        const user = await User.create({
            "name": req.body.name,
            "phone": req.body.phone,
            "email": req.body.email,
            "password": req.body.password,
            "gender": req.body.gender,
            "degree": req.body.degree
        }, { transaction: t }); 

        const clinic = {
            "clinic_name": req.body.clinic_name,
            "clinic_phone": req.body.clinic_phone,
            "clinic_email": req.body.clinic_email,
            "clinic_address": req.body.clinic_address,
            "city": req.body.city,
            "pin_code": req.body.pin_code,
            "state": req.body.state,
            "gov_reg_id":req.body.gov_reg_id,
            "admin_id": user.user_id
        };
        const roledata = {
            "assign_date":moment(currentDate).format('DD-MM-YYYY'),
            "user_id": user.user_id,
            "role_id": roles.role_id
        };

        const clinicdata = await clinic_master.create(clinic, { transaction: t }); 

        const userrole = await user_role.create(roledata,{ transaction: t });
        

        if (req.body.is_doctor) {

            const doctor_id = await role_master.findOne({where:{role_name:"doctor"}})
            const doctordata ={
                 "doctor_user_id": user.user_id,
              }
              const roledata = {
                "assign_date":moment(currentDate).format('DD-MM-YYYY'),
                "user_id": user.user_id,
                "role_id": doctor_id.role_id
    
            };
            const userroles = await user_role.create(roledata,{ transaction: t });

            const doctor = await Doctor.create(doctordata,{ transaction: t });

            res.json(new ApiResponse(true, { clinicdata, user,doctor,userrole,userroles, }, "Registered successfully"));

            await t.commit();

        }
else{
           
            res.json(new ApiResponse(true, { clinicdata, user,userrole, }, "Registered successfully"))

        await t.commit();
}
    } catch (err) {
        await t.rollback();
        console.log(err.errors);
        const error = errorHendlar(err);
        res.json(new ApiResponse(false, error, "User Saved Failed !"));
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email (assuming email is unique)
        const user = await User.findOne({
            where: { email },
            attributes: { exclude: ["password"] }, // Exclude password from the returned user object
             include: [
                {
                    model: clinic_master,
                    as: "clinicdata",
                    attributes: ['clinic_name', 'clinic_id']
                },
                {
                    model: user_role,
                    as: 'user_roles',
                    attributes: ['role_id'],
                    include: [
                        {
                            model: role_master,
                            as: 'rolename',
                            attributes: ['role_name', 'description']
                        }
                    ]
                }
            ]
        });

        // If user is not found, return error
        if (!user) {
            return res.status(404).json(new ApiResponse(false, null, "User not found"));
        }

    
        if (user.active_status === true) {
            return res.status(403).json(new ApiResponse(false, null, "User is blocked. Contact administrator for assistance."));
        }


        const user_id = user.user_id;
        const token = jwt.generateAccessToken(user_id);

        // Return success response with user data and token
        res.json(new ApiResponse(true, { user, token }, "Login successful"));
    } catch (err) {
        console.error(err);
        // Handle errors appropriately
        res.status(500).json(new ApiResponse(false, null, "Invalid credentials"));
    }
});







module.exports = router
