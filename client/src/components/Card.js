export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-3 text-primary">
        {title}
      </h2>

      {children}
    </div>
  );
}
