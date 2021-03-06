const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number , 
    required: true,
    default: 1 // 0: Admin / 1: User / 2: Dev
  },
  token: {
    type: String,
    required: false
  },
  issues: {
    type: Schema.Types.ObjectId,
    ref: "Bug"
  },
  activities: [
    {
      type: String,
      required: false
    }
  ]
});

UserSchema.pre("save", async function(next) {
  let user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

UserSchema.pre("findByIdAndUpdate", async function(next) {
  let user = this;
  console.log("[UserSchema MiddleWare] User this" , user)
  if (user.isModified("password")) {
    console.log("[UserSchema MiddleWare] Changing password")
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

UserSchema.statics.authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email inexistente");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Password incorrecta");
  }
  return user;
};

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  if (!process.env.JWT_KEY){throw new Error("JWT_KEY not setted")}
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.token = token;
  await user.save();
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
