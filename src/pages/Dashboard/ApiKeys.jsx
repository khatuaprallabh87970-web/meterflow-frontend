import { useEffect, useState } from "react";
import axios from "axios";

export default function ApiKeys() {
  const [keys, setKeys] = useState([]);

  const token = localStorage.getItem("token");

  const fetchKeys = async () => {
    const res = await axios.get("https://meterflow-backend-ap90.onrender.com/api/keys", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setKeys(res.data);
  };

  const createKey = async () => {
    await axios.post(
      "https://meterflow-backend-ap90.onrender.com/api/keys",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchKeys();
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">API Keys</h2>
        <button
          onClick={createKey}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Generate Key
        </button>
      </div>

      <div className="space-y-4">
        {keys.map((k) => (
          <div
            key={k.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <span>{k.api_key}</span>
            <button
              onClick={() => navigator.clipboard.writeText(k.api_key)}
              className="text-blue-500"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}