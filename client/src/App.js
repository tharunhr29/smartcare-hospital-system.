import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Appointment from "./pages/BookAppointment";
import Queue from "./pages/QueueStatus";
import Payment from "./pages/Payment";
import Telemedicine from "./pages/Telemedicine";
import Prescription from "./pages/Prescription";
import AdminDashboard from "./pages/AdminDashboard";
import Feedback from "./pages/Feedback";
import AddDoctor from "./pages/AddDoctor";
import AppointmentApproval from "./pages/AppointmentApproval";



function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark bg-gray-900 text-white" : ""}>
      <BrowserRouter>

        <Navbar dark={dark} setDark={setDark} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/approval" element={<AppointmentApproval />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
