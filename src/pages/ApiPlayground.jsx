import { useState } from "react";
import axios from "axios";

export default function ApiPlayground() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("/api/usage/stats");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios({
        method,
        url: `http://localhost:5000${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: body ? JSON.parse(body) : {},
      });

      setResponse(res.data);
    } catch (err) {
      setResponse(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">API Playground</h1>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="p-2 border rounded"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="/api/usage/stats"
        />

        <button
          onClick={sendRequest}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Body */}
      {method !== "GET" && (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='{"key":"value"}'
          className="w-full h-32 p-2 border rounded mb-4"
        />
      )}

      {/* Response */}
      <div className="bg-black text-green-400 p-4 rounded overflow-auto h-80">
        <pre>
          {response
            ? JSON.stringify(response, null, 2)
            : "Response will appear here..."}
        </pre>
      </div>
    </div>
  );
}