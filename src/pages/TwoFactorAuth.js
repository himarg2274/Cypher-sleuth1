import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const TwoFactorAuth = () => {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  // Generate unique QR code on component mount
  useEffect(() => {
    // In a real app, you would get the userId from your authentication system
    const currentUserId = `user_${Math.floor(Math.random() * 10000)}`; 
    setUserId(currentUserId);
    
    generateQRCode(currentUserId);
  }, []);

  // Generate a unique QR code by calling the backend
  const generateQRCode = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5001/api/2fa/generate-qrcode", { userId });
      setQrCodeValue(response.data.qrCode);
      setSecret(response.data.secret);
      setLoading(false);
    } catch (err) {
      setError("Failed to generate QR code. Please try again.");
      setLoading(false);
      console.error("QR code generation error:", err);
    }
  };

  // Verify OTP through backend
  const handleVerify = async () => {
    try {
      if (!otp || otp.length !== 6) {
        setIsVerified(false);
        return;
      }
      
      const response = await axios.post("http://localhost:5001/api/2fa/verify-otp", {
        otp,
        secret,
      });
      
      setIsVerified(response.data.valid);
    } catch (err) {
      setIsVerified(false);
      console.error("OTP verification error:", err);
    }
  };

  return (
    <div className="bg-black min-h-screen text-cyan-400">
      <div className="p-4" style={{
        marginLeft:"400px"}}>
        <h2 className="text-2xl ">TWO-FACTOR AUTHENTICATION</h2>
      </div>
      
    
    {/* Centered Box */}
    <div
      style={{
        background: "linear-gradient(145deg,rgba(0, 27, 52, 0.78),rgba(3, 52, 94, 0.65))",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0, 255, 255, 0.5)",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "400px",
        width: "90%", // Adjust width for responsiveness
        border: "1px solid rgba(0, 255, 255, 0.3)",
        position:"absolute",
        left:"30%"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="flex flex-col items-center justify-center p-4"
      >
        <p style={{
        color: "#00eaff",
        textDecoration: "none",
        
      }} className="text-cyan-300 font-bold mb-4">
          Scan the QR code using an authenticator app (like Google Authenticator) and enter the OTP to verify.
        </p>
        
        {loading ? (
          <p style={{
            color: "#00eaff",
            textDecoration: "none",
            fontWeight: "bold"
          }} className="text-cyan-300">Loading QR code...</p>
        ) : error ? (
          <p style={{
            color: "#00eaff",
            textDecoration: "none",
            fontWeight: "bold"
          }} className="text-red-500">{error}</p>
        ) : (
          <div className="mb-6 p-4 bg-white rounded-lg">
            <QRCodeCanvas value={qrCodeValue} size={200} />
          </div>
        )}
        
        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
          maxLength={6}
          style={{
            width: "200px",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            backgroundColor: "#011b2b",
            color: "#00eaff",
            border: "1px solid rgba(0, 255, 255, 0.5)"
          }}
        />
        
        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={otp.length !== 6}
          style={{
            marginTop: "10px",
            width: "200px",
            padding: "10px",
            fontSize: 18,
            backgroundColor: otp.length === 6 ? "#00eaff" : "#004e5c",
            color: "#000814",
            border: "none",
            borderRadius: 8,
            cursor: otp.length === 6 ? "pointer" : "not-allowed",
            fontWeight: "bold"
          }}
        >
          Verify OTP
        </button>
        
        {/* Verification Message */}
        {isVerified !== null && (
          <div 
            className="mt-4 p-3 rounded-lg text-center font-bold"
            style={{
              backgroundColor: isVerified ? "rgba(0, 128, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
              color: isVerified ? "#00ff00" : "#ff0000",
              width: "40%",
  
            }}
          >
            <p style={{textalign: "center"}}>{isVerified ? "OTP Verified!" : "Invalid OTP!"}</p>
            <p style={{textalign: "center"}}>Status: {isVerified ? "Access Granted" : "Access Denied"}</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;