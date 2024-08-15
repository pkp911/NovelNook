const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a Password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  favourite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  ],
  // resetPasswordToken:String,
  // resetPasswordExpire:Date,
});
console.log(process.env.JWT_SECRET);

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

module.exports = new mongoose.model("User", userSchema);
