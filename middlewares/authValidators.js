const { validateEmail, validatePassword } = require("../utils/validation");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ msg: "Please send string values only" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        msg: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ msg: "Account created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.validateLogin = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all details" });
    }
  
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }
  
    return true;
};

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        console.log("Token received:", token); // Log the token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object

        console.log("Decoded user info:", decoded); // Log the decoded user info

        next();
    } catch (err) {
        console.error("Token validation error:", err); // Log the error for debugging
        return res.status(401).json({ msg: "Token is not valid" });
    }
};

  