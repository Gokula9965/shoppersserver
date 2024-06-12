const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userSchema"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products"
    },
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
});

module.exports = mongoose.model("cart", cartSchema);