const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields is required");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email must be unique");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res
      .status(201)
      .json({ _id: user.id, name, email, token: generateJWT(user.id) });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields is required");
  }

  const userExist = await User.findOne({ email });

  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    res.status(200).json({
      _id: userExist.id,
      name: userExist.name,
      email,
      token: generateJWT(userExist.id),
    });
  } else {
    res.status(400);
    throw new Error("bad credentials");
  }
});

const userData = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  if (!_id || !name || !email) {
    res.status(400);
    throw new Error("Error ocurred");
  }

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = { register, login, userData };
