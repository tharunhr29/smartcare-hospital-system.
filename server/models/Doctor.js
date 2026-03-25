const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  status: { type: String, default: "Available" },

  schedule: [
    {
      day: String,
      startTime: String,
      endTime: String
    }
  ]
});

module.exports = mongoose.model("Doctor", doctorSchema);
