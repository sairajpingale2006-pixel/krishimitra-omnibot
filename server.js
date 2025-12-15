const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());

const IMAGE_API_URL = "https://krishi-mitra-image.onrender.com/upload";

app.get("/", (req, res) => {
  res.json({ status: "Omnibot running" });
});

// Image upload from user → forward to image AI service
app.post("/analyze-image", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path;

    const imageData = fs.createReadStream(imagePath);

    const response = await axios.post(
      IMAGE_API_URL,
      { image: imageData },
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    fs.unlinkSync(imagePath); // delete temp file

    res.json({
      success: true,
      analysis: response.data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Image analysis failed",
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Omnibot running on port", PORT);
});
