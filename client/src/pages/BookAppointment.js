import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function BookAppointment() {
  const [form, setForm] = useState({
    patientName: "",
    doctor: "",
    date: "",
    priority: "Normal"
  });
  const navigate = useNavigate();

  const bookAppointment = async () => {
    try {
      const res = await API.post("/appointments", form);

      // Redirect to payment page with appointment ID
      navigate("/payment", {
        state: { appointmentId: res.data._id }
      });

    } catch (err) {
      console.log(err);
      alert("Appointment booking failed");
    }
  };

  return (
    <div className="p-10 text-center">

      <h2 className="text-2xl font-bold mb-4">
        Book Appointment
      </h2>

      <input
        placeholder="Patient Name"
        className="border p-2 m-2"
        onChange={e =>
          setForm({ ...form, patientName: e.target.value })
        }
      />

      <input
        placeholder="Doctor"
        className="border p-2 m-2"
        onChange={e =>
          setForm({ ...form, doctor: e.target.value })
        }
      />

      <input
        type="date"
        className="border p-2 m-2"
        onChange={e =>
          setForm({ ...form, date: e.target.value })
        }
      />
<select
  onChange={e =>
    setForm({ ...form, priority: e.target.value })
  }
  className="border p-2 rounded"
>
  <option value="Normal">Normal</option>
  <option value="Emergency">Emergency 🚑</option>
</select>

      <br />

      <button
        onClick={bookAppointment}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Book Appointment
      </button>

    </div>
  );
}
