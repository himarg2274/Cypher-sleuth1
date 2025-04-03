import React, { useState } from "react";
import axios from "axios";
import "./ReportBreach.css";
import Header from "../components/Header";

function ReportBreach() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    breachType: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5002/report-breach", formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", breachType: "", description: "" });
    } catch (err) {
      setMessage("Error submitting the report.");
    }
  };

  return (
    <div>
      <Header/>
    <div className="report-breach-container">
      <h2 className="hh">Report a Security Breach</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <select name="breachType" value={formData.breachType} onChange={handleChange} required>
          <option value="">Select Breach Type</option>
          <option value="Phishing">Phishing Attack</option>
          <option value="Data Leak">Data Leak</option>
          <option value="Hacked Account">Hacked Account</option>
          <option value="Other">Other</option>
        </select>
        <textarea name="description" placeholder="Describe the issue..." value={formData.description} onChange={handleChange} required></textarea>
        <button className="butt" type="submit">Submit Report</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>  
  );
}

export default ReportBreach;
