const router = require("express").Router();
const Doctor = require("../models/Doctor");

// ADD DOCTOR
router.post("/", async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.json(doctor);
});

// GET ALL DOCTORS
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// UPDATE STATUS
router.put("/status/:id", async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  // DELETE DOCTOR
router.delete("/:id", async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);

  // Real-time update
  req.app.get("io").emit("doctorDeleted", doctor);

  res.json({ message: "Doctor deleted" });
});
router.put("/status/:id", async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  req.app.get("io").emit("doctorUpdate", doctor);

  res.json(doctor);
});

// UPDATE DOCTOR SCHEDULE
router.put("/schedule/:id", async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    { schedule: req.body.schedule },
    { new: true }
  );

  res.json(doctor);
});

  // Real-time update
  req.app.get("io").emit("doctorUpdate", doctor);

  res.json(doctor);
});

module.exports = router;
