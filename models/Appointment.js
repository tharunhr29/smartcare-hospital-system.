const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctor: String,
  date: Date,
  tokenNumber: Number,

  status: {
    type: String,
    default: "Pending"
  },

  paymentStatus: {
    type: String,
    default: "Unpaid"
  },

  priority: {
    type: String,
    enum: ["Normal", "Emergency"],
    default: "Normal"
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
