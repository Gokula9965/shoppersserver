const asyncHandler = require("express-async-handler");
const customerDetails = require("../Schema/customerDetails");

const addCustomerData = asyncHandler(async (req, res) => {
    try {
        let { orderId, firstName, lastName, address1, address2,city, state, postalCode, country, email, phone, cartItems,total ,invoiceNumber} = req?.body;   
        postalCode = Number(postalCode);
        address2 = address2 ?? null;
        if (!orderId || !firstName || !lastName || !address1 || !city || !state || !postalCode || !country || !email || !phone || !cartItems || !invoiceNumber) {
            res.status(400)
            throw new Error("All fields  orderId, firstName, lastName, address1, city, state, postalCode, country, email, phone and  customerItems are mandatory");
        }

        const newCustomer = await customerDetails.create({
            customerId: req?.user?.user?.id,
            orderId,
            firstName,
            lastName,
            email,
            phoneNumber:phone,
            address1,
            address2,
            city,
            state,
            postalCode,
            country,
            customerItems: cartItems,
            totalAmount: total,
            invoiceNumber
        });
        
        res.status(200).send({ message: "New customer added successfully", newCustomer: newCustomer });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Error adding new customer" });
    }
});
const getCustomerData = asyncHandler(async (req, res) => {
    const customerResponse = await customerDetails.find({ customerId: req?.user?.user?.id }).sort({orderedAt:-1});
    if (!customerResponse)
    {
        res.status(400)
        throw new Error("You have no orders"); 
    }
    res.status(200).send(customerResponse); 
})

module.exports = { addCustomerData ,getCustomerData};