const asyncHandler = require("express-async-handler");
const cartSchema = require("../Schema/cartData");
const cartData = asyncHandler(async (req, res) => {
  const data = req?.body;
  const cartResponse = await cartSchema.findOne({
    $and: [{ userId: req?.user?.user?.id }, { productId: data?._id }],
  });
  if (cartResponse) {
    await cartSchema.updateOne(
      { $and: [{ userId: req?.user?.user?.id }, { productId: data?._id }] },
      { $set: { quantity: data?.quantity } }
    );
    const cartCount = await cartSchema
      .find({ userId: req?.user?.user?.id })
      .countDocuments();
    res.status(200).json({ message: "cart is updated", cartCount });
  } else if (!cartResponse) {
      await cartSchema.create({
      userId: req?.user?.user?.id,
      productId: data?._id,
      title: data?.title,
      thumbnail: data?.thumbnail,
      quantity: data?.quantity,
      price: data?.price,
      category:data?.category 
    });
    const cartCount = await cartSchema
      .find({ userId: req?.user?.user?.id })
      .countDocuments();
    res
      .status(200)
      .json({ message: "New Product is added to the cart", cartCount });
    }
  else {
      res.status(500)
      throw new Error("Something went wrong try again later");
    }
});

const getCartCount = asyncHandler(async (req, res) => {
    const cartCount = await cartSchema.find({ userId: req?.user?.user?.id }).countDocuments();
    res.status(200).json({ cartCount });

});
const getCartItems = asyncHandler(async (req, res) => {
    const cart = await cartSchema.find({ userId: req?.user?.user?.id });
    const cartCount = await cartSchema.find({ userId: req?.user?.user?.id }).countDocuments();
    res.status(200).json({ cart ,cartCount});
});
const deleteCartItem = asyncHandler(async (req, res) => {
    console.log(req?.params?.id);
    await cartSchema.deleteOne({ $and: [{ userId: req?.user?.user?.id }, { _id: req?.params?.id }] });
    const count = await cartSchema.find({ userId: req?.user?.user?.id }).countDocuments();
    res.status(200).send(count);
});

const updateCart = asyncHandler(async (req, res) => {
    const data = req?.body;
    console.log(data);
    const update = await cartSchema.updateOne({ $and: [{ userId: req?.user?.user?.id }, { _id: data?.id }] }, { $set: { quantity: data?.quantity } })
    console.log(update);
    res.status(200).send({ message: "sucessfully updated" });
});
const deleteAllCart = asyncHandler(async (req, res) => {
  await cartSchema.deleteMany({ userId: req?.user?.user?.id });
  const count = await cartSchema.find({ userId: req?.user?.user?.id }).countDocuments();
  res.status(200).json({ count });
})
module.exports = { cartData,getCartCount,getCartItems,deleteCartItem,updateCart,deleteAllCart};
