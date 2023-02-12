const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./Middleware/errorHandler");
const authRouter = require("./Routes/Auth.Route");


/* Application Middleware */
app.use(express.json())
app.use(cors())


/* Home Route */
app.get('/', (req, res) => {
    res.send("Gym Equipment Website");
})



/****** All Routes ******/
app.use("/user", authRouter)



/* Undefined Route */
app.all('*', (req, res) => {
    res.send('No Route Found')
})


/* Global Error Handler*/
app.use(errorHandler);


/* Uncaught Error Handler */
process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    })
})


module.exports = app;