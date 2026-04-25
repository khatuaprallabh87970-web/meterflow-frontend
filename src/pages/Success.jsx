import { useEffect } from "react";
import axios from "axios";

export default function Success() {

  useEffect(() => {
    const savePayment = async () => {
      try {
        const token = localStorage.getItem("token");

        const params = new URLSearchParams(window.location.search);
        const amount = params.get("amount");

        if (!amount) return; // safety check

        await axios.post(
          "https://meterflow-backend-ap90.onrender.com/api/payment/save",
          { amount },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

      } catch (err) {
        console.error("Save payment error:", err);
      }
    };

    savePayment();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment has been completed successfully.
        </p>

        <a
          href="/dashboard"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </a>

      </div>
    </div>
  );
}