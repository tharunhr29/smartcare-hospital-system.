import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";

export default function QueueStatus() {

  const [queue, setQueue] = useState([]);

  useEffect(() => {
    API.get("/appointments")
      .then(res => setQueue(res.data));
  }, []);

  useEffect(() => {
    socket.on("queueUpdate", data => {
      setQueue(prev => [...prev, data]);
    });

    return () => socket.off("queueUpdate");
  }, []);

  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold mb-6">
        Live Hospital Queue
      </h2>

      {queue.map(q => (
        <div
          key={q._id}
          className="bg-white shadow p-4 rounded mb-3 flex justify-between"
        >
          <span>{q.patientName}</span>
          <span>Token: {q.tokenNumber}</span>
          <span>{q.status}</span>
        </div>
      ))}

    </div>
  );
}
