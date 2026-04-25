import { useEffect, useState } from "react";
import axios from "axios";

export default function Billing() {
  const [stats, setStats] = useState({
    totalCost: 0,
  });

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://meterflow-backend-ap90.onrender.com/api/usage/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);


  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://meterflow-backend-ap90.onrender.com/api/payment",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPayments(res.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };

    fetchPayments();
  }, []);

  const handlePay = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://meterflow-backend-ap90.onrender.com/api/payment/checkout",
        { amount: stats.totalCost },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Billing</h1>

      {/* Payment Card */}
      <div className="bg-white p-6 rounded-xl shadow max-w-md">

        <p className="text-gray-500">Total Amount</p>

        <h2 className="text-3xl font-bold mt-2">
          ₹{stats.totalCost ? stats.totalCost.toFixed(2) : "0.00"}
        </h2>

        <button
          onClick={handlePay}
          disabled={!stats.totalCost}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-6 w-full hover:bg-indigo-700 disabled:opacity-50"
        >
          Pay Now
        </button>

      </div>

      
      <div className="mt-10 max-w-md">
        <h2 className="text-xl font-bold mb-4">Payment History</h2>

        {payments.length === 0 ? (
          <p className="text-gray-500">No payments yet</p>
        ) : (
          payments.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-lg shadow mb-2 flex justify-between items-center"
            >
              <span className="font-semibold">₹{p.amount}</span>
              <span className="text-green-600 capitalize">{p.status}</span>
              <span className="text-gray-500 text-sm">
                {new Date(p.created_at).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}