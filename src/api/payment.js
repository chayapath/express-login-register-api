const express = require("express");
const { session } = require("passport");
const passport = require("passport");

const router = express.Router();

router.get(
  "/payment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      message: "Total: 2400$",
    });
  }
);

module.exports = router;
