import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPage from './pages/DashboardPage';
import SpamDetection from './components/SpamDetection';
import ReportBreach from './pages/ReportBreach';
import Classification from './pages/Classification';
import Chatbot from './pages/Chatbot';  // ✅ Import the chatbot component
import PasswordChecker from "../src/pages/PasswordChecker";
import EmailLeakChecker from "../src/pages/EmailLeakChecker";
import CyberNews from "../src/pages/CyberNews";
import Fingerprint from "../src/pages/Fingerprint";
import TwoFactorAuth from "../src/pages/TwoFactorAuth";

function App() {
  return (
    <Router>
      <div> {/* Wrap everything inside a div */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/report-breach" element={<ReportBreach />} />
          <Route path="/classify" element={<Classification />} />
          <Route path="/spam-detection" element={<SpamDetection />} />
          <Route path="/password-checker" element={<PasswordChecker />} />
          <Route path="/email-leak-checker" element={<EmailLeakChecker />} />
          <Route path="/cyber-news" element={<CyberNews />} />
          <Route path="/fingerprint" element={<Fingerprint />} />
          <Route path="/2fa" element={<TwoFactorAuth />} />
        </Routes>

        <Chatbot />  {/* ✅ Add chatbot here, so it's visible on all pages */}
      </div>
    </Router>
  );
}

export default App;
