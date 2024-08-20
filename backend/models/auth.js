const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decoded.id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
