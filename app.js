const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "your_secret_key", // Замініть на власний секретний ключ
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Сесія зберігається протягом однієї хвилини
  })
);

// Налаштування шаблонізатора EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Підключення маршрутів
const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard", user: req.user });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
