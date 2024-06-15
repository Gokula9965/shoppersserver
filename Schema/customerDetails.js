const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category:{
        type:String,
        required:true
    }
})
const customerSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userSchema"
    },
    orderId: {
        type: String,
        required: true
    },
    invoiceNumber: {
        type: Number,
        required:true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    tax:{
        type: Number,
        required:true
    },
    customerItems: [cartSchema],
    orderedAt: {
         type: Date,
         default: () => Date.now()
    }
});

module.exports = mongoose.model("customerSchema", customerSchema);
