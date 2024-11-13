const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const jwt = require('./config/Tokenmanage')
const apiRouter = require('./routers/apiRouter')
const authRouter = require('./routers/authRouter')
const axios = require('axios')
const path = require('path')
dotenv.config()

const server = express()
//server.use(fileUpload())
server.use(cors());
server.use(express.urlencoded())
server.use(express.json())

server.use(express.static(path.join(__dirname, "uploads")))

server.get("/", (request, response) => {
    
    response.send("Clinic Server Running ...... ")
})


//  server.use("/api", async (req, res, next) => {
//     const result = await jwt.authenticateToken(req)
//     if (result.status)
//         next()
//     else
//         res.json(result)

// }); 

server.use("/api", apiRouter)
server.use("/auth", authRouter);
//server.use("/patient", patientRouter)


const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

