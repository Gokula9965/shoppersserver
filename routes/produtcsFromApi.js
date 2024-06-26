const express = require("express");
const { productsFromStore ,updatedCategory,getProducts, getCategory,getSingleProduct, addReviewToProducts, productsStockUpdate} = require("../controllers/products");
const productsFromStoreRouter = express.Router();


productsFromStoreRouter.get('/getCategory', getCategory)
productsFromStoreRouter.get('/getProduct/:id',getSingleProduct)
productsFromStoreRouter.get('/:category', getProducts);
productsFromStoreRouter.post('/', productsFromStore);
productsFromStoreRouter.patch('/addReview/:id', addReviewToProducts);
productsFromStoreRouter.patch('/product/stockUpdate',productsStockUpdate);
productsFromStoreRouter.patch('/:category', updatedCategory);


module.exports = productsFromStoreRouter;