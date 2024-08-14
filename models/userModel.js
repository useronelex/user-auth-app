const db = require("../config/db");

class User {
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async create(email, password) {
    const [result] = await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
    return result.insertId;
  }
}

module.exports = User;
