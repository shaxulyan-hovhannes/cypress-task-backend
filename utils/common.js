const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_OPTIONS } = require("./../constants/common");

const ACCESS_TOKEN_SECRET_KEY = "a9e5c7d55de2bbplf5d4e6t9x1000z46wfjsfjTm11m3f";
// JWT secret key should be saved in .env file. Doing this way only for this task.

const generateAccessToken = async (payload = {}) => {
  try {
    const accessToken = await jwt.sign(
      payload,
      ACCESS_TOKEN_SECRET_KEY,
      ACCESS_TOKEN_OPTIONS
    );

    return accessToken;
  } catch ({ message }) {
    throw Error(message);
  }
};

module.exports = {
  generateAccessToken,
  ACCESS_TOKEN_SECRET_KEY,
};
