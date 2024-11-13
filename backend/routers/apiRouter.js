const express = require('express')
const patientRouter = require('../routers/patientRouter')
const userRouter = require("./userRouter")
//const receptionRouter = require("../routers/receptionRouter")
const prescriptionRouter = require("./prescriptionRouter")
const test_prescriptionRouter= require('./test_prescrptionRouter');
const userrole = require('./userroleRouter');
const staff = require('./staffRouter');
const appointment = require('./appointmentRouter')
const doctorRouter = require('./doctorRouter')
const medicalprescriptioRouter= require('./medicalprescriptionRouter')
const masterrole = require('./roleMasterRouter');
const clinic = require('./clinic_master')
const expens = require('./clinic_expensesRouter');
const  testmaster= require('./testmasterRouter')
const router = express.Router()


router.use("/user",userRouter )
router.use("/doctor", doctorRouter)
router.use("/patient", patientRouter)
router.use("/prescription",prescriptionRouter);
router.use("/test",test_prescriptionRouter);
router.use("/role",userrole);
router.use('/staff',staff)
router.use('/medical',medicalprescriptioRouter)
router.use('/appointment',appointment)
router.use('/master',masterrole);
router.use('/clinic/',clinic)
router.use('/expense',expens)
router.use('/testmaster',testmaster)


module.exports = router;
