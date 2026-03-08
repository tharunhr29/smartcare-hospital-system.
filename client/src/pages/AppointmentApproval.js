import { useEffect, useState } from "react";
import API from "../services/api";

export default function AppointmentApproval() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await API.get("/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const approve = async id => {
    await API.put(`/appointments/approve/${id}`);
    fetchAppointments();
  };

  const reject = async id => {
    await API.put(`/appointments/reject/${id}`);
    fetchAppointments();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        Appointment Approval Panel
      </h2>

      {appointments.map(a => (
        <div
          key={a._id}
          className="p-4 shadow rounded mb-3 flex justify-between"
        >
          <div>
            <h3>{a.patientName}</h3>
            <p>Status: {a.status}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => approve(a._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => reject(a._id)}
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
