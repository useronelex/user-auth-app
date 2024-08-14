const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("register", { errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.render("register", {
        errors: [{ msg: "User with this email already exists" }],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create(email, hashedPassword);

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("register", {
      errors: [{ msg: "Something went wrong. Please try again later." }],
    });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("login", { errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.render("login", {
        errors: [{ msg: "Invalid email or password" }],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        errors: [{ msg: "Invalid email or password" }],
      });
    }

    req.session.userId = user.id;
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("login", {
      errors: [{ msg: "Something went wrong. Please try again later." }],
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/dashboard");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("register", { errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.render("register", {
        errors: [{ msg: "User with this email already exists" }],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create(email, hashedPassword);

    res.redirect("/login");
  } catch (err) {
    console.error("Error during user registration:", err);
    res.render("register", {
      errors: [{ msg: "Something went wrong. Please try again later." }],
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.render("login", { errors: [{ msg: "Invalid credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { errors: [{ msg: "Invalid credentials" }] });
    }

    req.session.user = user;
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Error during login:", err);
    res.render("login", {
      errors: [{ msg: "Something went wrong. Please try again later." }],
    });
  }
};
