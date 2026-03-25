import { useEffect, useState } from "react";
import socket from "../services/socket";
import API from "../services/api";

export default function LiveQueue() {

  const [queue, setQueue] = useState([]);

  // Load initial queue
  const fetchQueue = async () => {
    const res = await API.get("/appointments");
    setQueue(res.data);
  };

  useEffect(() => {
    fetchQueue();

    // Listen realtime updates
    socket.on("queueUpdate", () => {
      fetchQueue();
    });

    return () => socket.off("queueUpdate");
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold mb-4 text-lg">
        Live Queue Status
      </h2>

      {queue.map(q => (
        <div
          key={q._id}
          className={
            q.priority === "Emergency"
              ? "bg-red-100 border-l-4 border-red-500 p-3 rounded mb-2"
              : "p-3 border-b"
          }
        >
          {q.patientName} — Token {q.tokenNumber}
        </div>
      ))}

    </div>
  );
}
