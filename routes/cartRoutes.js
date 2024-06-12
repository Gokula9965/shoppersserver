const express = require("express");
const cartRouter = express.Router();
const validateToken = require("../middlewares/validateToken");
const { cartData ,getCartCount, getCartItems, deleteCartItem, updateCart, deleteAllCart} = require("../controllers/cart");


cartRouter.post('/addToCart', validateToken, cartData);
cartRouter.get('/getCart', validateToken, getCartCount);
cartRouter.get('/getCartItems', validateToken, getCartItems);
cartRouter.delete('/deleteAllCart', validateToken, deleteAllCart);
cartRouter.delete('/deleteCart/:id', validateToken, deleteCartItem);
cartRouter.patch('/updateCart', validateToken, updateCart);

module.exports = cartRouter;