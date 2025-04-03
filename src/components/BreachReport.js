import React, { useState } from 'react';

function BreachReport() {
  const [breachDetails, setBreachDetails] = useState('');

  const handleReportSubmit = () => {
    // Submit breach report logic
    alert('Breach Report Submitted!');
  };

  return (
    <div>
      <h2>Breach Reporting</h2>
      <textarea
        value={breachDetails}
        onChange={(e) => setBreachDetails(e.target.value)}
        placeholder="Describe the breach here..."
      />
      <button onClick={handleReportSubmit}>Submit Report</button>
    </div>
  );
}

export default BreachReport;
