const router = require("express").Router();
const User = require("../models/User");

router.post("/darkmode", async (req, res) => {
  const { userId, darkMode } = req.body;

  await User.findByIdAndUpdate(userId, { darkMode });

  res.json({ msg: "Preference saved" });
});

module.exports = router;
