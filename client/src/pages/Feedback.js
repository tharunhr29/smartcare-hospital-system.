export default function Feedback() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">

      <div className="bg-white shadow-lg p-6 rounded-xl w-96">

        <h2 className="text-xl font-bold mb-4">
          Patient Feedback
        </h2>

        <textarea
          className="border p-3 w-full rounded mb-4"
          placeholder="Write your feedback..."
        />

        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Submit Feedback
        </button>

      </div>

    </div>
  );
}
