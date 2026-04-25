import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UsageChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/usage/analytics",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setData(res.data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-lg font-semibold mb-4">
        API Usage Over Time {/* ✅ better title */}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#6366f1" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}