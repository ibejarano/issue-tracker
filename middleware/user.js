const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userInfo = async (req, res, next) => {
  try {
    console.log("[USER Middleware]");
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error("Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("MIDDLEWARE ERROR:", error.toString());
    res.status(401).json("Unauthorized access");
  }
};

module.exports = userInfo;
