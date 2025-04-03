import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Attempting login...");

    try {
      const response = await axios.post(
        "http://localhost:5002/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/spam-detection");
    } catch (err) {
      console.error("Error response:", err.response?.data || err.message);

      if (err.response) {
        setError(err.response.data.error || "Invalid email or password.");
      } else {
        setError("Server unreachable. Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            className="login-input" 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            className="login-input" 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="login-error">{error}</p>}
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}

export default Login;
