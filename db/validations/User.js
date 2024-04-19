const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().trim().alphanum().min(2).max(30).required(),
  password: Joi.string().trim().min(5).required(),
});

module.exports = userSchema;
