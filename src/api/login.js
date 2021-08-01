const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Login Error: ", err);
    }
  );

  if (!userWithEmail) {
    console.log("Login Error: Not found user in database");
    return res.json({ message: "Email or password does not match!" });
  }

  const isMatch = await bcrypt.compare(password, userWithEmail.password);

  if (!isMatch) {
    console.log(`Login Error: Password does not match with email ${email}`);
    return res.json({ message: "Email or password does not match!" });
  }

  const jwtToken = jwt.sign(
    {
      id: userWithEmail.id,
      email: userWithEmail.email,
    },
    process.env.JWT_SECRET
  ); // jwt%12345&

  return res.json({
    message: "Welcome Back!",
    jwt_token: jwtToken,
  });
});

module.exports = router;
