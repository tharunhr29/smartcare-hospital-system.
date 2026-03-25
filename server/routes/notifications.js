const router = require("express").Router();
const Notification = require("../models/Notification");

router.get("/", async (req, res) => {
  const data = await Notification.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const note = new Notification(req.body);
  await note.save();
  res.json(note);
});

module.exports = router;
