import { Link } from "react-router-dom";

export default function Navbar({ dark, setDark }) {
  return (
    <nav className="bg-primary text-white shadow-lg px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">🏥 SmartCare</h1>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/appointment">Appointment</Link>
        <Link to="/queue">Queue</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/payment">Payment</Link>

        <button
          onClick={() => setDark(!dark)}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Dark
        </button>
      </div>
    </nav>
  );
}
