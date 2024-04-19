var express = require("express");
var router = express.Router();

const userSchema = require("./../db/validations/User");

const Product = require("./../db/models/Products");

const { verifyToken } = require("./../middlewares");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { name, price } = req.body;

    const user = req.user;

    const newProduct = new Product({
      name,
      price,
      admin_id: user._id,
    });

    const savedProduct = await newProduct.save();

    res.status(200).send(savedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
