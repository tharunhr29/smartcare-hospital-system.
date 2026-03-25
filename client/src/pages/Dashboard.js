import { motion } from "framer-motion";
import Charts from "../components/Charts";
import LiveQueue from "../components/LiveQueue";
import ActivityFeed from "../components/ActivityFeed";
import DoctorStatus from "../components/DoctorStatus";
import Notification from "../components/Notification";


import { FaUserMd, FaCalendarCheck, FaHospital, FaHeartbeat } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">
          🏥 SmartCare Hospital Dashboard
        </h1>
        <p className="mt-2 opacity-90">
          Digital healthcare management system
        </p>
      </div>

      {/* NOTIFICATION */}
      <Notification />

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-4 gap-6">

        <motion.div whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaUserMd size={35} className="text-blue-600" />
          <div>
            <h3 className="font-semibold">Doctors</h3>
            <p className="text-gray-500">25 Active</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaCalendarCheck size={35} className="text-green-600" />
          <div>
            <h3 className="font-semibold">Appointments</h3>
            <p className="text-gray-500">120 Today</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaHospital size={35} className="text-purple-600" />
          <div>
            <h3 className="font-semibold">Patients</h3>
            <p className="text-gray-500">340 Total</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaHeartbeat size={35} className="text-red-600" />
          <div>
            <h3 className="font-semibold">Emergency</h3>
            <p className="text-gray-500">5 Active</p>
          </div>
        </motion.div>

      </div>

      {/* CHART + LIVE QUEUE */}
      <div className="grid md:grid-cols-2 gap-6">
        <Charts />
        <LiveQueue />
      </div>

      {/* ACTIVITY + DOCTOR STATUS */}
      <div className="grid md:grid-cols-2 gap-6">
        <ActivityFeed />
        <DoctorStatus />
      </div>

    </div>
  );
}
