const express = require("express");
const connectionDb = require("./connectionDb");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoutes");
const cartRouter=require("./routes/cartRoutes")
const cors = require("cors");
const productsFromStoreRouter = require("./routes/produtcsFromApi");
const payementRouter = require("./routes/payment");
const customerRouter = require("./routes/customerRoutes");
const pdfRouter = require("./routes/pdfRoutes");
require("dotenv").config();
const app = express();
connectionDb();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/user', userRouter);
app.use('/products', productsFromStoreRouter);
app.use('/cart', cartRouter);
app.use('/payment', payementRouter);
app.use('/customer', customerRouter);
app.use('/pdf', pdfRouter);
app.use(errorHandler);
app.listen(process.env.PORT ?? 5000, () => {
    console.log(`Port is listening on ${process.env.PORT}`);
});