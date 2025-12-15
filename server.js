const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Omnibot running" });
});

// TEXT CHAT
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  // Simple AI-style response (can be upgraded)
  const reply = `Based on your input: "${message}", here is a helpful response.`;

  res.json({ reply });
});

// IMAGE → FORWARD TO IMAGE SERVICE
app.post("/image-result", async (req, res) => {
  try {
    const imageServiceURL =
      "https://krishi-mitra-image.onrender.com/analyze-image";

    const response = await axios.post(imageServiceURL, req.body);

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Image service unavailable" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Omnibot running on port", PORT);
});
