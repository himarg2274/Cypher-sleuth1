import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./pass.css";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const checkStrength = (password) => {
    if (password.length === 0) {
      setStrength("");
      setProgress(0);
      return;
    }

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 2) {
      setStrength(" WEAK");
      setProgress(30);
    } else if (score <= 4) {
      setStrength(" MEDIUM");
      setProgress(60);
    } else {
      setStrength(" STRONG");
      setProgress(100);
    }
  };

  return (
    <div className="password-checker">
      <h2>Password Strength Checker</h2>
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            checkStrength(e.target.value);
          }}
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <div className="progress-container">
        <div
          className={`progress-bar ${strength.toLowerCase().split(" ")[1]}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className={`strength ${strength.toLowerCase().split(" ")[1]}`}>
        {strength}
      </p>
    </div>
  );
}

export default PasswordChecker;
