// Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/breach-report">Breach Reporting</a></li>
        <li><a href="/spam-detection">Spam Detection</a></li>
        <li><a href="/phishing-detection">Phishing Detection</a></li>
        <li><a href="/recommendations">Recommendations</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
