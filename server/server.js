require("dotenv").config();
require("./config/DBconnect");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Image = require("./models/imgModel");

//instance of express
const app = express();

//=========
//global middleware
//=========
app.use(cors());
// Body parser middleware setup
//======jab react ka use karte hai tab eska jarurat nahi padta
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//this is only for saving in fs
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${Date.now()}.${ext}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("not an image please upload only images", false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//========
//routes
//========

app.get("/", (req, res) => {
  res.send("hello world");
});

//create image
app.post("/images", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Convert buffer to base64 string
    const base64String = req.file.buffer.toString("base64");

    // Upload base64 string to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64String}`
    );

    // Save image details to MongoDB
    const newImage = new Image({
      name: req.body.name || "Unnamed",
      image: result.secure_url,
    });

    await newImage.save();

    res.json({
      status: "success",
      image: newImage,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get images
app.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      status: "success",
      data: images,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
