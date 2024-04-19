var express = require("express");
var router = express.Router();

const BuyersHistory = require("./../db/models/BuyersHistory");

const { verifyToken } = require("./../middlewares");

router.get("/", verifyToken, async (req, res, next) => {
  const userId = req.user._id;

  const buyersHistoryItems = await BuyersHistory.find({
    admin_ids: { $in: [userId] },
  });

  res.status(200).json(buyersHistoryItems);
});

module.exports = router;
