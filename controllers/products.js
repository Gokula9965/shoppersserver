const asyncHandler = require('express-async-handler');
const axios = require("axios");
const apiData = require('../Schema/apiData');
const productsFromStore = asyncHandler(async (req, res) => {
    const category = ["beauty", "fragrances", "skin-care", "mens-shirts", "mens-shoes", "mens-watches", "tops", "womens-dresses", "womens-jewellery","womens-bags" ,"womens-shoes", "womens-watches", "laptops", "smartphones", "tablets", "sports-accessories","furniture","groceries",
    "home-decoration",
    "kitchen-accessories"];
    let flag = 0;
    for (let i = 0; i < category.length; i++)
    {
        const responseFromStore = await axios.get(`https://dummyjson.com/products/category/${category[i]}`);
        if (!responseFromStore)
        {
            res.status(500)
            throw new Error("Something went wrong please try again later");
        }
        const data = responseFromStore?.data?.products;
        await apiData.create(data);
        flag++;
    }
    if (flag === category.length)
    {
        res.status(200).send({ message: "Products added successfully to the Collection" });
    }
    else {
        res.status(500)
        throw new Error("Cant fetch the data from store try again later...");
    }
});
const updatedCategory = asyncHandler(async (req, res) => {
    const cate = req.params.category;
    const { updatedCategory } = req?.body;
    await apiData.updateMany({ category: cate }, { $set: { category: updatedCategory } });
    res.status(200).send({ message: "Category updated successully" });
});

const getProducts = asyncHandler(async (req, res) => {
    const category = req.params.category;
    const categoryResponse = await apiData.find({ category: category });
    const count = await apiData.find({ category: category }).countDocuments();
    if (categoryResponse) {
        res.status(200).json({ data: categoryResponse, count })
    }
    else {
        res.status(500)
        throw new Error("No data is found");
    }
});

const getCategory = asyncHandler(async (req, res) => {
    const getCategoryFromDb = await apiData.distinct("category");
    if (getCategoryFromDb.length > 0) {
        res.status(200).json({ category: getCategoryFromDb });
    }
    else {
        res.status(404)
        throw new Error("No category is found");
    }
});

const getSingleProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const getProduct = await apiData.findOne({ _id: id });
    if (getProduct && getProduct.reviews) {
         getProduct.reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }    
    if (getProduct)
    {
        res.status(200).send(getProduct);    
    }
    else {
        res.status(404)
        throw new Error("No product is found");
    }
});

const addReviewToProducts = asyncHandler(async (req, res) => {
    const id = req?.params?.id;
    const data = req?.body;
    await apiData.updateOne({ _id: id }, { $push: { reviews: data } });
    res.status(200).send({ msg: "updated" });
});
module.exports = { productsFromStore ,updatedCategory,getProducts,getCategory,getSingleProduct,addReviewToProducts};