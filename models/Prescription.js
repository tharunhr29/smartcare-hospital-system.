const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patient: String,
  doctor: String,
  medicines: String,
  date: Date
});

module.exports = mongoose.model(
  "Prescription",
  prescriptionSchema
);
