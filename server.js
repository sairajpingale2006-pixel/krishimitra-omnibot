const express = require("express");
const app = express();

app.use(express.json());

// ---------------- SESSION MEMORY ----------------
const sessions = new Map();

// ---------------- CORE RESPONSE ENGINE ----------------
function buildResponse(title, points, suggestion) {
  let text = `${title}\n`;
  text += "────────────────────\n\n";

  points.forEach(point => {
    text += `• ${point}\n`;
  });

  if (suggestion) {
    text += `\n────────────────────\n${suggestion}`;
  }

  return text;
}

// ---------------- INTENT HANDLER ----------------
function handleTextMessage(message, sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { history: [] });
  }

  const session = sessions.get(sessionId);
  session.history.push(message);
  if (session.history.length > 6) session.history.shift();

  const text = message.toLowerCase();

  // -------- GREETING --------
  if (text.includes("hello") || text.includes("hi")) {
    return buildResponse(
      "Welcome",
      [
        "I can help with crop-related questions",
        "You can ask about prices, diseases, or farming decisions",
        "Responses are simple and practical"
      ],
      "Example: tomato price today"
    );
  }

  // -------- MARKET --------
  if (text.includes("price") || text.includes("market")) {
    return buildResponse(
      "Current Market Overview",
      [
        "Tomato: ₹1800 – ₹2400 per quintal",
        "Onion: ₹2800 – ₹3400 per quintal",
        "Demand is stable in most regions"
      ],
      "Suggestion: Monitor prices for the next few days before selling"
    );
  }

  // -------- CROP ISSUE --------
  if (
    text.includes("disease") ||
    text.includes("leaf") ||
    text.includes("yellow") ||
    text.includes("pest")
  ) {
    return buildResponse(
      "Crop Health Observation",
      [
        "Symptoms may indicate pest or nutrient stress",
        "Early treatment improves recovery chances",
        "Accurate diagnosis requires visual confirmation"
      ],
      "Next step: Share a clear photo of the affected plant"
    );
  }

  // -------- HELP --------
  if (text.includes("help")) {
    return buildResponse(
      "How I Can Assist",
      [
        "Crop health guidance",
        "Market price insights",
        "Basic farming recommendations",
        "Clear and simple explanations"
      ],
      "Ask your question in your own words"
    );
  }

  // -------- FALLBACK --------
  return buildResponse(
    "Information Received",
    [
      "Your message has been noted",
      "More details will help give a better answer"
    ],
    "Please provide a little more information"
  );
}

// ---------------- WEBHOOK ----------------
app.post("/webhook", (req, res) => {
  try {
    const sessionId =
      req.body.session || "default-session";

    const userText =
      req.body.queryResult?.queryText ||
      req.body.message ||
      "";

    const reply = handleTextMessage(userText, sessionId);

    res.json({
      fulfillmentText: reply
    });
  } catch (err) {
    res.json({
      fulfillmentText:
        "Sorry, something went wrong. Please try again."
    });
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.send("Krishi-Mitra server is running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime()
  });
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
