const router = require("express").Router();
const Appointment = require("../models/Appointment");

router.post("/", async (req, res) => {
  try {
    const count = await Appointment.countDocuments();

    const appointment = new Appointment({
      ...req.body,
      tokenNumber: count + 1
    });

    await appointment.save();

    /* EMIT REALTIME UPDATE */
    const io = req.app.get("io");
    io.emit("queueUpdate", appointment);

    res.json(appointment);

  } catch (err) {
    res.status(500).json(err.message);
  }
});
// Accept appointment
router.put("/accept/:id", async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: "Confirmed" },
    { new: true }
  );

  // Send realtime update
  req.app.get("io").emit("queueUpdate", appointment);

  res.json(appointment);
});

// Reject appointment
router.put("/reject/:id", async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: "Rejected" },
    { new: true }
  );

  res.json(appointment);
});
router.post("/", async (req, res) => {
  const { priority } = req.body;

  let tokenNumber;

  if (priority === "Emergency") {
    const count = await Appointment.countDocuments({
      priority: "Emergency"
    });
    tokenNumber = "E" + (count + 1);
  } else {
    const count = await Appointment.countDocuments({
      priority: "Normal"
    });
    tokenNumber = "N" + (count + 1);
  }

  const appointment = new Appointment({
    ...req.body,
    tokenNumber
  });

  await appointment.save();

  req.app.get("io").emit("queueUpdate", appointment);

  res.json(appointment);
});

// ===== Mark patient as Emergency =====
router.put("/emergency/:id", async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { priority: "Emergency" },
    { new: true }
  );

  // realtime queue update
  req.app.get("io").emit("queueUpdate", appointment);

  res.json(appointment);
});
router.post("/", async (req, res) => {
  const count = await Appointment.countDocuments();

  const appointment = new Appointment({
    ...req.body,
    tokenNumber: count + 1
  });

  await appointment.save();

  // REAL-TIME UPDATE
  req.app.get("io").emit("queueUpdate", appointment);

  res.json(appointment);
});
router.put("/approve/:id", async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: "Approved" },
    { new: true }
  );
router.put("/reject/:id", async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: "Rejected" },
    { new: true }
  );

  res.json(appointment);
});

  req.app.get("io").emit("queueUpdate", appointment);

  res.json(appointment);
});
// APPROVE APPOINTMENT
router.put("/approve/:id", async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: "Approved" },
    { new: true }
  );

  req.app.get("io").emit("queueUpdate", appointment);

  res.json(appointment);
});

// REJECT APPOINTMENT
router.put("/reject/:id", async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: "Rejected" },
    { new: true }
  );

  res.json(appointment);
});

router.put("/emergency/:id", async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { priority: "Emergency" },
    { new: true }
  );

  req.app.get("io").emit("queueUpdate", appointment);

  res.json(appointment);
});


router.get("/", async (req, res) => {
  const data = await Appointment.find();
  res.json(data);
});

module.exports = router;
