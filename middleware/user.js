const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userInfo = async (req, res, next) => {
  try {
    console.log("[USER Middleware]");
    console.log("headers", req.header("Authorization"));
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
    res.status(500).json("Unauthorized acces because: " + error.toString());
  }
};

module.exports = userInfo;
