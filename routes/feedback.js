const router = require("express").Router();
const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

router.post("/", async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.json({ msg: "Feedback saved" });
});

router.get("/", async (req, res) => {
  const data = await Feedback.find();
  res.json(data);
});

module.exports = router;
