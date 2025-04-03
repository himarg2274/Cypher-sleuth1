import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./SpamDetection.css";

function SpamDetection() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Sending request to backend...");
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: emailText }),
      });
      
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }
      const data = await response.json();
      console.log("API Response:", data);
      if (!data || data.prediction === undefined) {
        throw new Error("Invalid response from server");
      }
      setResult(data.prediction === 1 ? "🚨 Spam Detected" : "✅ Not Spam");
    } catch (error) {
      setError("Failed to connect to the server. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <Header />
      <main className="spam-container">
        <div className="spam-card">
          <h2>Spam Detection</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Enter email text here..."
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              required
            />
            <button className="bb" type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check Spam"}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {result && <p className="result">{result}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SpamDetection;
