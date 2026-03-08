import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold tracking-wide">
        🏥 SmartCare
      </h1>

      <div className="flex gap-6 font-medium items-center">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/appointment">Appointment</Link>
        <Link to="/queue">Queue</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/add-doctor">Add Doctor</Link>


        <button
          onClick={toggleDark}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Dark Mode
        </button>
      </div>

    </nav>
  );
}
