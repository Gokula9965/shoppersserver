const express = require("express");
const { registerUser, loginUser, currentUser, resetPassword } = require("../controllers/user");
const validateToken = require("../middlewares/validateToken");
const { registerValidation, loginValidation } = require("../middlewares/userValidation");
const userRouter = express.Router();

userRouter.post('/register',registerValidation,registerUser);
userRouter.post('/login',loginValidation,loginUser);
userRouter.get('/currentUser',validateToken,currentUser);
userRouter.patch('/reset-password', loginValidation,resetPassword);
module.exports = userRouter;


