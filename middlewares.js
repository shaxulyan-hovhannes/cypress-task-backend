const jwt = require("jsonwebtoken");

const User = require("./db/models/User");

const { ACCESS_TOKEN_SECRET_KEY } = require("./utils/common");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not found access token" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Not found such as user" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  verifyToken,
};
