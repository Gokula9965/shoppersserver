const express = require("express");
const customerRouter = express.Router();
const validateToken = require("../middlewares/validateToken");
const { addCustomerData ,getCustomerData} = require("../controllers/customerData");

customerRouter.post('/addItem',validateToken,addCustomerData);
customerRouter.get("/getCutomerData", validateToken, getCustomerData);

module.exports = customerRouter;