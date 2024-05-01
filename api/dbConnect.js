const mongoose = require("mongoose");

const seedAdmins = require("./adminsSeeder");

// Connect to mongodb ORM mongoose
const connectToBD = () => {
  const MONGODB_URI = "mongodb://localhost:27017/cypress";
  // Should be in .env file

  mongoose.set("strictQuery", false);
  mongoose.connect(MONGODB_URI).then(() => {
    console.log("Mongoose connected to DB");

    // This script also can be run only once as node adminSeeder.js, and then run the app. Admins will be already created in DB
    seedAdmins();
  });
};

module.exports = connectToBD;
