// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serves HTML, CSS, JS from public folder

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const result = await apiResponse.json();
    res.json({ reply: result.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});