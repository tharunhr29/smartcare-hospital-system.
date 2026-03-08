export default function ActivityFeed() {

  const activities = [
    "John booked appointment",
    "Emma completed consultation",
    "Mike uploaded prescription",
    "Sarah payment success"
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="font-bold mb-4">
        Recent Activity
      </h2>

      {activities.map((a, i) => (
        <div key={i} className="py-2 border-b">
          {a}
        </div>
      ))}

    </div>
  );
}
