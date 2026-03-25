const router = require("express").Router();
const Appointment = require("../models/Appointment");

router.get("/stats", async (req, res) => {
  try {
    const totalPatients = await Appointment.countDocuments();

    const today = new Date().toISOString().slice(0, 10);

    const todayAppointments = await Appointment.countDocuments({
      date: { $gte: new Date(today) }
    });

    res.json({
      totalPatients,
      todayAppointments,
      revenue: todayAppointments * 500
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
