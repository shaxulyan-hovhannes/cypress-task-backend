const bcrypt = require("bcrypt");

const User = require("./../db/models/User");

const { USER_ROLES } = require("./../constants/common");

const { generateAccessToken } = require("./../utils/common");

const saltRounds = 10;

const admins = [
  {
    username: "Username1",
    password: "11111",
    role: USER_ROLES.admin,
  },
  {
    username: "Username2",
    password: "22222",
    role: USER_ROLES.admin,
  },
  {
    username: "Username3",
    password: "33333",
    role: USER_ROLES.admin,
  },
];

const seedAdmins = async () => {
  try {
    for await (const admin of admins) {
      const foundAdmin = await User.findOne({
        username: admin.username,
        role: USER_ROLES.admin,
      });

      if (!foundAdmin) {
        const hashedPassword = await bcrypt.hash(admin.password, saltRounds);

        const newAdmin = new User({
          ...admin,
          password: hashedPassword,
        });

        const savedAdmin = await newAdmin.save();

        const adminId = savedAdmin._id;

        const accessToken = await generateAccessToken({
          userId: adminId,
        });

        await User.findByIdAndUpdate(
          { _id: adminId },
          {
            access_token: accessToken,
          }
        );
      }
    }
  } catch (err) {
    console.log(`Seed admins error - ${err.message}`);
  }
};

module.exports = seedAdmins;
