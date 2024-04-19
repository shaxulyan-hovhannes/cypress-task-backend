var express = require("express");
var router = express.Router();

const Product = require("./../db/models/Products");
const BuyersHistory = require("./../db/models/BuyersHistory");

const { verifyToken } = require("./../middlewares");

router.get("/", verifyToken, async (req, res) => {
  const userId = req.user._id;

  const foundProducts = await Product.find({
    admin_id: userId,
  });

  res.status(200).json(foundProducts);
});

router.get("/all", verifyToken, async (req, res) => {
  const foundProducts = await Product.find();

  res.status(200).json(foundProducts);
});

router.post("/buy", verifyToken, async (req, res) => {
  const products = req.body || [];

  const user = req.user;

  console.log("BODY", products);

  const productNames = [];
  const adminIds = [];
  let totalAmount = 0;

  products.forEach((product) => {
    productNames.push(product.name);
    adminIds.push(product.admin_id);
    totalAmount += product.price;
  });

  const newBuyerHistory = new BuyersHistory({
    admin_ids: Array.from(new Set(adminIds)),
    username: user.username,
    product: Array.from(new Set(productNames)).join(),
    totalAmount,
    buy_date: new Date(),
  });

  await newBuyerHistory.save();

  res.status(200).json({ messsage: "Products buy was successfully" });
});

module.exports = router;
