import React, { useState } from "react";
import "./Header.css"; // Import custom CSS
import { FaShieldAlt } from "react-icons/fa"; // Import Cybersecurity Icon

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      {/* Logo & Icon */}
      <div className="logo-container">
        <FaShieldAlt className="app-icon" /> {/* Icon */}
        <div className="logo">CypherSleuth</div> {/* Title */}
      </div>

      {/* Navigation - Hidden by default, shown when menu is open */}
      <nav className={menuOpen ? "nav-visible" : "nav-hidden"}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/report-breach">Report Breach</a></li>
          <li><a href="/classify">Threat Scan</a></li>
        </ul>
      </nav>

      {/* Hamburger Menu - Always at Right Side */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </header>
  );
}

export default Header;
