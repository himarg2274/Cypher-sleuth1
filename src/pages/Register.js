import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Attempting registration...");
    
    try {
      const response = await axios.post(
        "http://localhost:5002/register",
        { username, email, password },  // ✅ Ensure username is sent
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Error response:", err.response?.data || err.message);
      
      if (err.response) {
        setError(err.response.data.error || "Registration failed. Try again.");
      } else {
        setError("Server unreachable. Check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input 
            className="register-input" 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            className="register-input" 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            className="register-input" 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button className="register-button" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="register-error">{error}</p>}
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Register;
