const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://127.0.0.1:27017/education-app'
    );

    console.log(
      "Database connected"
    );

  } catch (error) {

    console.error(
      "Database connection failed",
      error
    );

    process.exit(1);
  }
};

module.exports = connectDB;
