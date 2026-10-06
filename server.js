module.exports = async (req, res) => {
  // ==============================
  // GET — SERVER STATUS
  // ==============================
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Bharat Jeevan AI backend is working!",
      status: "online"
    });
  }

  // ==============================
  // POST — AI CHAT
  // ==============================
  if (req.method === "POST") {
    try {
      const apiKey = process.env.OPENAI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          success: false,
          error: "OPENAI_API_KEY is missing."
        });
      }

      const { message } = req.body || {};

      if (!message || typeof message !== "string") {
        return res.status(400).json({
          success: false,
          error: "Please provide a message."
        });
      }

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },

          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",

            messages: [
              {
                role: "system",
                content:
                  "You are Bharat Jeevan AI, an intelligent assistant built to help people across India. Give accurate, practical, clear and easy-to-understand answers."
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

      // ==============================
      // OPENAI ERROR
      // ==============================
      if (!response.ok) {
        console.error("OpenAI API error:", data);

        return res.status(response.status).json({
          success: false,
          error:
            data?.error?.message ||
            "The AI service returned an error."
        });
      }

      // ==============================
      // SUCCESS
      // ==============================
      const answer =
        data?.choices?.[0]?.message?.content;

      if (!answer) {
        return res.status(500).json({
          success: false,
          error: "The AI returned an empty response."
        });
      }

      return res.status(200).json({
        success: true,
        answer: answer
      });

    } catch (error) {
      console.error("SERVER ERROR:", error);

      return res.status(500).json({
        success: false,
        error: error.message || "Internal server error."
      });
    }
  }

  // ==============================
  // OTHER METHODS
  // ==============================
  return res.status(405).json({
    success: false,
    error: "Method not allowed."
  });
};
