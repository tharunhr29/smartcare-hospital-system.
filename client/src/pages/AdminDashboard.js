import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // ===== FETCH DOCTORS =====
  const fetchDoctors = async () => {
    const res = await API.get("/doctors");
    setDoctors(res.data);
  };

  // ===== FETCH APPOINTMENTS =====
  const fetchAppointments = async () => {
    const res = await API.get("/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  // ===== UPDATE DOCTOR STATUS =====
  const updateStatus = async (id, status) => {
    await API.put(`/doctors/status/${id}`, { status });
    fetchDoctors();
  };

  // ===== DELETE DOCTOR =====
  const deleteDoctor = async id => {
    if (!window.confirm("Delete this doctor?")) return;
    await API.delete(`/doctors/${id}`);
    fetchDoctors();
  };

  // ===== SET DOCTOR SCHEDULE =====
  const updateSchedule = async id => {
    const schedule = [
      { day: "Monday", startTime: "10:00", endTime: "2:00" },
      { day: "Wednesday", startTime: "4:00", endTime: "7:00" }
    ];

    await API.put(`/doctors/schedule/${id}`, { schedule });
    alert("Schedule Updated");
    fetchDoctors();
  };

  // ===== APPOINTMENT APPROVAL =====
  const approveAppointment = async id => {
    await API.put(`/appointments/approve/${id}`);
    fetchAppointments();
  };

  const rejectAppointment = async id => {
    await API.put(`/appointments/reject/${id}`);
    fetchAppointments();
  };

  return (
    <div className="p-8">

      {/* DOCTOR PANEL */}
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        🏥 Admin Doctor Control Panel
      </h2>

      {doctors.map(d => (
        <div
          key={d._id}
          className="flex justify-between items-center p-4 shadow rounded-lg mb-4 bg-white"
        >
          <div>
            <h3 className="font-semibold text-lg">{d.name}</h3>
            <p className="text-gray-500">{d.specialization}</p>
            <p>Status: {d.status}</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => updateStatus(d._id, "Available")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Available
            </button>

            <button
              onClick={() => updateStatus(d._id, "Busy")}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Busy
            </button>

            <button
              onClick={() => updateStatus(d._id, "Unavailable")}
              className="bg-gray-600 text-white px-3 py-1 rounded"
            >
              Unavailable
            </button>

            <button
              onClick={() => updateSchedule(d._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Set Schedule
            </button>

            <button
              onClick={() => deleteDoctor(d._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* APPOINTMENT APPROVAL PANEL */}
      <h2 className="text-xl font-bold mt-10 mb-4">
        Patient Appointment Approval
      </h2>

      {appointments.map(a => (
        <div
          key={a._id}
          className="flex justify-between items-center bg-white shadow p-4 mb-3 rounded"
        >
          <div>
            <h3>{a.patientName}</h3>
            <p>Doctor: {a.doctor}</p>
            <p>Status: {a.status}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => approveAppointment(a._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => rejectAppointment(a._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}
