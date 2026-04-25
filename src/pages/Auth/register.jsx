import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[360px]">

        <h1 className="text-2xl font-bold text-white text-center mb-6">
          MeterFlow
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Create your account
        </p>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          Register
        </button>

        <p className="text-sm text-gray-300 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-white font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}