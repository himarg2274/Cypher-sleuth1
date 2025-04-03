import React, { useState } from "react";
import "./EmailLeakChecker.css";

function EmailLeakChecker() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const checkEmailLeak = async () => {
    if (!email) {
      setResult("Please enter an email address.");
      return;
    }

    // Simulating API response
    setTimeout(() => {
      const isLeaked = Math.random() < 0.5;
      setResult(
        isLeaked
          ? "⚠️ Your email has been found in a data breach!"
          : "✅ Your email is safe!"
      );
    }, 1000);
  };

  return (
    <div className="email-leak-checker">
      <h2>Email Leak Checker</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={checkEmailLeak}>Check</button>
      <p className="result">{result}</p>
    </div>
  );
}

export default EmailLeakChecker;
