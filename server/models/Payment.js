const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    amount: Number,
    paymentId: String,
    orderId: String,
    status: String,
    userId: String,
    appointmentId: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
