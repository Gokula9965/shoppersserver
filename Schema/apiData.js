const mongoose = require("mongoose");

const productsFromStore = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("products", productsFromStore);