const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

// CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Order creation failed");
  }
});
const Appointment = require("../models/Appointment");

router.post("/verify", async (req, res) => {
  const { order_id, payment_id, signature, amount, appointmentId } = req.body;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(order_id + "|" + payment_id)
    .digest("hex");

  if (expected === signature) {

    await Payment.create({
      amount,
      paymentId: payment_id,
      orderId: order_id,
      status: "Success"
    });

    // AUTO CONFIRM APPOINTMENT
    await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        paymentStatus: "Paid",
        status: "Confirmed"
      }
    );

    return res.json({ success: true });
  }

  res.status(400).json({ success: false });
});


module.exports = router;
