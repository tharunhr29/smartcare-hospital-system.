import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

export default function DoctorStatus() {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const res = await API.get("/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();

    socket.on("doctorUpdate", () => {
      fetchDoctors();
    });

    return () => socket.off("doctorUpdate");
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Doctor Availability
      </h2>

      {doctors.map(d => (
        <div
          key={d._id}
          className="flex justify-between border-b py-3"
        >
          <div>
            <p className="font-semibold">{d.name}</p>
            <p className="text-sm text-gray-500">
              {d.specialization}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded text-white ${
              d.status === "Available"
                ? "bg-green-500"
                : d.status === "Busy"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }`}
          >
            {d.status}
          </span>
        </div>
      ))}
    </div>
  );
}
