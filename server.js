const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ===============================
// BASIC CONFIG
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend/static files
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// HEALTH CHECK
// ===============================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Bharat Jeevan AI server is running",
    status: "online"
  });
});

// ===============================
// HOME PAGE
// ===============================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// AI API
// ===============================
app.post("/api/ai", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "OPENAI_API_KEY is not configured on the server."
      });
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    // OpenAI API request
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content:
              "You are Bharat Jeevan AI, an intelligent assistant designed to help people across India. Give clear, practical, accurate and easy-to-understand answers."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);

      return res.status(response.status).json({
        success: false,
        error:
          data?.error?.message ||
          "The AI service returned an error."
      });
    }

    const answer =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    res.json({
      success: true,
      answer: answer
    });

  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      success: false,
      error: "Internal server error."
    });
  }
});

// ===============================
// FALLBACK FOR FRONTEND ROUTES
// ===============================
app.get("*", (req, res) => {
  // Don't interfere with API routes
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({
      success: false,
      error: "API route not found"
    });
  }

  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// LOCAL SERVER
// ===============================
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Bharat Jeevan AI running on port ${PORT}`);
  });
}

// ===============================
// IMPORTANT FOR VERCEL
// ===============================
module.exports = app;
