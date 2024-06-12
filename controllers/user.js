const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userData = require("../Schema/userData");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { userName, emailId, password } = req?.body; 
    if (!userName || !emailId || !password)
    {
        res.status(400)
        throw new Error("All fields userName, emailId and password are required");
    }
    const userResponse = await userData.findOne({ emailId });
    if (userResponse && userResponse.emailId === emailId)
    {
        res.status(400)
        throw new Error("User Already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userData.create({
        userName,
        emailId,
        password: hashedPassword        
    });
    res.status(200).send({ message: "New User registered Successfully", user: newUser });
});

const loginUser = asyncHandler(async (req, res) => {
    const { emailId, password   } = req?.body;
    if (!emailId || !password) {
        res.status(400)
        throw new Error("All fields emailId and password are required");
    };
    const userResponse = await userData.findOne({ emailId });
    if (userResponse && await bcrypt.compare(password,userResponse.password)) {
        const accessToken = jwt.sign({
            user: {
                userName: userResponse.userName,
                emailId: userResponse.emailId,
                id: userResponse.id
            }
        }, process.env.ACCESS_TOKEN_SCERET, { expiresIn: "30d" });
        res.status(200).json({ accessToken });
    }
    else {
        res.status(400)
        throw new Error("Incorrect email or password");
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).send(req.user); 
});

const resetPassword = asyncHandler(async (req, res) => {
    const { emailId, password } = req?.body;
    if (!emailId || !password) {
        res.status(400)
        throw new Error("All fields emailId and password are required");
    };
    const userResponse = await userData.findOne({ emailId });
    if (userResponse) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userData.updateOne({ _id: userResponse.id }, { $set: { password: hashedPassword, updatedAt: Date.now() } });
        res.status(200).json({ message: "Password updated successfully" });
    }
    else {
        res.status(400)
        throw new Error("No account is found");
    }
});

module.exports = { registerUser, loginUser, currentUser, resetPassword };
