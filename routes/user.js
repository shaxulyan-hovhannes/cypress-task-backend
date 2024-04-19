var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");

const userSchema = require("./../db/validations/User");

const { generateAccessToken } = require("./../utils/common");

const saltRounds = 10;

const User = require("./../db/models/User");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create", async (req, res) => {
  try {
    const { username, password } = req.body;

    const validatedUserPayload = await userSchema.validateAsync({
      username,
      password,
    });

    const hashedPassword = await bcrypt.hash(
      validatedUserPayload.password,
      saltRounds
    );

    const newUser = new User({
      username: validatedUserPayload.username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const userId = savedUser._id;

    const accessToken = await generateAccessToken({
      userId,
    });

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        access_token: accessToken,
      }
    );

    savedUser.access_token = accessToken;

    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({
      username,
    });

    if (foundUser) {
      const isPasswordsMatch = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (isPasswordsMatch) {
        const accessToken = await generateAccessToken({
          userId: foundUser._id,
        });

        await User.findByIdAndUpdate(
          { _id: foundUser._id },
          {
            access_token: accessToken,
          }
        );

        foundUser.access_token = accessToken;

        res.status(200).send(foundUser);
      } else {
        throw new CustomError({
          message: "Incorrect password",
        });
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
