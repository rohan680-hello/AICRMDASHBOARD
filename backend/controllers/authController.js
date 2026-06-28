import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Helper to generate a secure JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const sendAuthResponse = (res, statusCode, user) => {
  res.status(statusCode).json({
    success: true,
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      avatar: user.avatar,
      role: user.role,
    },
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // 2. Create the user (Password hashing happens automatically in the User model!)
    const user = await User.create({ name, email, password });

    if (user) {
      sendAuthResponse(res, 201, user);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email (explicitly asking for the password field since we hid it by default)
    const user = await User.findOne({ email }).select('+password');

    // 2. Check if user exists AND password matches the hash
    if (user && (await user.matchPassword(password))) {
      sendAuthResponse(res, 200, user);
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
