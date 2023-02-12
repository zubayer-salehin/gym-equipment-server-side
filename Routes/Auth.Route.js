const express = require('express');
const router = express.Router();
const userControllers = require("../Controllers/Auth.Controllers");
const { verifyToken } = require('../Middleware/verifyToken');


router.get("/", userControllers.getUsers);

router.post("/signup", userControllers.createUser);

router.post("/login", userControllers.userLogin);

router.get("/userVerify", verifyToken, userControllers.userVerifyByToken);

router.get("/forgetPasswordEmail/:email", userControllers.forgetPasswordEmail);

router.patch("/resetPassword/:id", userControllers.resetPassword);


module.exports = router;