const router = require("express").Router();
const mongoose = require("mongoose");

/* Activity Schema */
const ActivitySchema = new mongoose.Schema({
  message: String,
  time: {
    type: Date,
    default: Date.now
  }
});

const Activity = mongoose.model("Activity", ActivitySchema);

/* Add activity */
router.post("/", async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.json(activity);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* Get activities */
router.get("/", async (req, res) => {
  const data = await Activity.find().sort({ time: -1 });
  res.json(data);
});

module.exports = router;
