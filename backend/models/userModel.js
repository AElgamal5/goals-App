const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name filed is required"],
    },
    email: {
      type: String,
      required: [true, "email filed is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password filed is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
