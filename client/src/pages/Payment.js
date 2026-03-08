import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {

  const location = useLocation();
  const navigate = useNavigate();

  // Appointment ID coming from booking page
  const appointmentId = location.state?.appointmentId;

  const pay = async () => {
    try {

      // 1️⃣ Create Razorpay order
      const { data } = await API.post("/payment/create-order", {
        amount: 500
      });

      const options = {
        key: "rzp_test_SFGAri9Oepkkkc", // YOUR KEY
        amount: data.amount,
        currency: "INR",
        name: "SmartCare Hospital",
        description: "Doctor Appointment Payment",
        order_id: data.id,

        // 2️⃣ Payment success handler
        handler: async (response) => {

          await API.post("/payment/verify", {
            order_id: data.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: 500,
            appointmentId
          });

          alert("✅ Payment Successful — Appointment Confirmed");

          // Redirect to queue page
          navigate("/queue");
        },

        prefill: {
          name: "Patient",
          email: "patient@email.com",
          contact: "9999999999"
        },

        theme: {
          color: "#2563EB"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("❌ Payment Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">

      <h2 className="text-3xl font-bold text-blue-600">
        Appointment Payment
      </h2>

      <p className="text-gray-600">
        Consultation fee ₹500
      </p>

      <button
        onClick={pay}
        className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-700"
      >
        Pay ₹500
      </button>

    </div>
  );
}
