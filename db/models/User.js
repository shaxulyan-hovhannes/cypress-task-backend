const { Schema, model } = require("mongoose");
const { USER_ROLES } = require("./../../constants/common");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
    default: "",
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.user,
  },
  access_token: {
    type: String,
    default: "",
  },
  refresh_token: {
    type: String,
    default: "",
  },
  // Referesh token is not implemented
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const User = model("User", userSchema);

module.exports = User;
