import { useState } from "react";

export default function Notification() {

  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 bg-blue-600 text-white p-4 rounded shadow-lg">
      Appointment Confirmed!
      <button
        className="ml-4"
        onClick={() => setShow(false)}
      >
        ✖
      </button>
    </div>
  );
}
