const { default: mongoose } = require("mongoose");

const imgSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Image = mongoose.model("Image", imgSchema);
module.exports = Image;
