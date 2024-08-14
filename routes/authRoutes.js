const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

// Форма реєстрації
router.get("/register", (req, res) => {
  res.render("register", { errors: [] });
});

// Обробка реєстрації
router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authController.register
);

// Форма логіну
router.get("/login", (req, res) => {
  res.render("login", { errors: [] });
});

// Обробка логіну
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authController.login
);

// Вихід з системи
router.get("/logout", authController.logout);

module.exports = router;
