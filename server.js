const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

module.exports = async (req, res) => {
  // Home / health check
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Bharat Jeevan AI backend is working!",
      status: "online"
    });
  }

  // AI endpoint
  if (req.method === "POST") {
    try {
      if (!OPENAI_API_KEY) {
        return res.status(500).json({
          success: false,
          error: "OPENAI_API_KEY is not configured."
        });
      }

      const { message } = req.body || {};

      if (!message) {
        return res.status(400).json({
          success: false,
          error: "Message is required."
        });
      }

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are Bharat Jeevan AI, an intelligent AI assistant designed to help people across India. Give clear, practical and accurate answers."
              },
              {
                role: "user",
                content: message
              }
            ]
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({
          success: false,
          error: data?.error?.message || "OpenAI API request failed."
        });
      }

      return res.status(200).json({
        success: true,
        answer: data.choices?.[0]?.message?.content || ""
      });

    } catch (error) {
      console.error("AI ERROR:", error);

      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: "Method not allowed."
  });
};
