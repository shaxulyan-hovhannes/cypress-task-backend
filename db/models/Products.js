const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    default: "",
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    required: true,
    default: "",
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
