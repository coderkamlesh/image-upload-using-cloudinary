const { default: mongoose } = require("mongoose");

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};
DBConnect();

module.exports = DBConnect;
