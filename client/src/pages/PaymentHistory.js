import { useEffect, useState } from "react";
import API from "../services/api";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId") || "123";

  useEffect(() => {
    API.get(`/payment/history/${userId}`)
      .then(res => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [userId]);

  const refund = async (id) => {
    try {
      await API.post("/payment/refund", {
        paymentId: id,
        amount: 500,
      });
      alert("Refund initiated");
    } catch {
      alert("Refund failed");
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-3xl font-bold mb-6 text-center">
        💳 Payment History
      </h2>

      {payments.length === 0 && (
        <p className="text-center">No payments found</p>
      )}

      {payments.map(p => (
        <div
          key={p._id}
          className="bg-white shadow-lg rounded-lg p-5 mb-4 border"
        >
          <p><b>Amount:</b> ₹{p.amount}</p>
          <p><b>Status:</b> {p.status}</p>
          <p><b>Payment ID:</b> {p.paymentId}</p>

          <div className="flex gap-4 mt-4">

            {/* Refund Button */}
            <button
              onClick={() => refund(p.paymentId)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Refund
            </button>

            {/* Invoice Download */}
            <a
              href={`http://localhost:5000/api/payment/invoice/${p._id}`}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Invoice PDF
            </a>

          </div>
        </div>
      ))}

    </div>
  );
}
