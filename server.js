module.exports = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bharat Jeevan AI backend is working!",
    status: "online"
  });
};
