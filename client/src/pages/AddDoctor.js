import { useState } from "react";
import API from "../services/api";

export default function AddDoctor() {
  const [form, setForm] = useState({
    name: "",
    specialization: ""
  });

  const addDoctor = async () => {
    await API.post("/doctors", form);
    alert("Doctor Added Successfully");
    setForm({ name: "", specialization: "" });
  };

  return (
    <div className="p-10 max-w-md mx-auto">

      <h2 className="text-2xl font-bold mb-6">
        Add Doctor
      </h2>

      <input
        placeholder="Doctor Name"
        className="border p-2 w-full mb-3"
        value={form.name}
        onChange={e =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Specialization"
        className="border p-2 w-full mb-3"
        value={form.specialization}
        onChange={e =>
          setForm({ ...form, specialization: e.target.value })
        }
      />

      <button
        onClick={addDoctor}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Add Doctor
      </button>
    </div>
  );
}
