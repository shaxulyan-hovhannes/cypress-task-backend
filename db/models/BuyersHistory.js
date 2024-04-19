const { Schema, model } = require("mongoose");

const buyersHistorySchema = new Schema({
  admin_ids: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: "",
  },
  username: {
    type: String,
    required: true,
    default: "",
  },
  product: {
    type: String,
    required: true,
    default: "",
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  buy_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const BuyersHistory = model("BuyersHistory", buyersHistorySchema);

module.exports = BuyersHistory;
