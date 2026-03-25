import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", patients: 30 },
  { day: "Tue", patients: 45 },
  { day: "Wed", patients: 20 },
  { day: "Thu", patients: 60 },
  { day: "Fri", patients: 35 }
];

export default function Charts() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-bold mb-4">
        Patient Visits
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="patients" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
