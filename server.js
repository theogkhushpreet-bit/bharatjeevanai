module.exports = async (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "Bharat Jeevan AI backend is working!",
      status: "online"
    });
  }

  if (req.method === "POST") {
    try {
      const apiKey = process.env.OPENAI_API_KEY;

      return res.status(200).json({
        success: true,
        apiKeyConfigured: !!apiKey,
        apiKeyLength: apiKey ? apiKey.length : 0,
        message: "Environment variable test completed."
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: "Method not allowed"
  });
};
