import { FiActivity, FiKey, FiDollarSign } from "react-icons/fi";
import { FiHome, FiBarChart2, FiCreditCard, FiLogOut, FiTerminal } from "react-icons/fi";
import ApiKeys from "./ApiKeys";
import { useEffect, useState } from "react";
import axios from "axios";
import UsageChart from "./UsageChart.jsx";
import { NavLink, useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCalls: 0,
    totalCost: 0,
  });

  const [analytics, setAnalytics] = useState([]);
  const [paymentTriggered, setPaymentTriggered] = useState(false);

  const avg =
    analytics.length > 0
      ? analytics.reduce((a, b) => a + b.count, 0) / analytics.length
      : 0;

  const peak =
    analytics.length > 0
      ? Math.max(...analytics.map(d => d.count))
      : 0;

  useEffect(() => {

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/usage/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(res.data);

        if (res.data.triggerPayment && !paymentTriggered) {
          setPaymentTriggered(true);

          alert("Billing threshold reached! Redirecting to payment...");

          const paymentRes = await axios.post(
            "http://localhost:5000/api/payment/checkout",
            { amount: res.data.totalCost },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          window.location.href = paymentRes.data.url;
        }

      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/usage/analytics",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAnalytics(res.data);

      } catch (err) {
        console.error("Analytics error:", err);
      }
    };

    fetchStats();
    fetchAnalytics();

  }, [paymentTriggered]);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between">
        
        <div>
          <h2 className="text-2xl font-bold mb-8 text-indigo-600 tracking-wide">
            MeterFlow
          </h2>

          <ul className="space-y-2">

            <li>
              <NavLink to="/dashboard" className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition ${
                  isActive ? "bg-indigo-100 text-indigo-600 font-semibold"
                           : "text-gray-600 hover:bg-gray-100"
                }`}>
                <FiHome /> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/keys" className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition ${
                  isActive ? "bg-indigo-100 text-indigo-600 font-semibold"
                           : "text-gray-600 hover:bg-gray-100"
                }`}>
                <FiKey /> API Keys
              </NavLink>
            </li>

            <li>
              <NavLink to="/usage" className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition ${
                  isActive ? "bg-indigo-100 text-indigo-600 font-semibold"
                           : "text-gray-600 hover:bg-gray-100"
                }`}>
                <FiBarChart2 /> Usage
              </NavLink>
            </li>

            <li>
              <NavLink to="/billing" className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition ${
                  isActive ? "bg-indigo-100 text-indigo-600 font-semibold"
                           : "text-gray-600 hover:bg-gray-100"
                }`}>
                <FiCreditCard /> Billing
              </NavLink>
            </li>

            {/*  NEW PLAYGROUND LINK */}
            <li>
              <NavLink
                to="/playground"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <FiTerminal /> Playground
              </NavLink>
            </li>

          </ul>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="flex items-center gap-3 text-red-500 hover:bg-red-50 p-2 rounded-lg w-full"
        >
          <FiLogOut /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl mb-6 shadow">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm opacity-90">
            Monitor your API usage and billing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow flex justify-between">
            <div>
              <p className="text-gray-500">Total API Calls</p>
              <h2 className="text-3xl font-bold mt-2">
                {stats.totalCalls || 0}
              </h2>
            </div>
            <FiActivity size={30} className="text-indigo-500" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex justify-between">
            <div>
              <p className="text-gray-500">API Keys</p>
              <h2 className="text-3xl font-bold mt-2">3</h2>
            </div>
            <FiKey size={30} className="text-purple-500" />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex justify-between">
            <div>
              <p className="text-gray-500">Monthly Cost</p>
              <h2 className="text-3xl font-bold mt-2">
                ₹{stats.totalCost ? stats.totalCost.toFixed(2) : "0.00"}
              </h2>

              <button
                onClick={() => navigate("/billing")}
                className="mt-3 text-sm text-indigo-600 hover:underline"
              >
                Go to Billing →
              </button>
            </div>
            <FiDollarSign size={30} className="text-green-500" />
          </div>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow mt-6">
          <h3 className="text-lg font-semibold mb-2">Usage Insights</h3>
          <p>Avg Usage: {avg.toFixed(1)}</p>
          <p>Peak Usage: {peak}</p>
        </div>

        <div className="mt-10 space-y-6">
          <ApiKeys />
          <UsageChart />
        </div>

      </div>
    </div>
  );
}