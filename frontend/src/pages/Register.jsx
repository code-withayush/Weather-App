import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Simple frontend validation
    if (!username || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    // Mock registration: just save data in localStorage (or ignore)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Clear form
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");

    // Redirect to Login
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-6">
      <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Register</h1>
      <form
        onSubmit={handleRegister}
        className="flex flex-col space-y-4 bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition duration-300"
        >
          Register
        </button>
        {error && (
          <p className="text-red-100 bg-red-600/70 px-4 py-2 rounded-lg text-center mt-2">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
