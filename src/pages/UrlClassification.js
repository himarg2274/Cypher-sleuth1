import React, { useState } from 'react';

function UrlClassifier() {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleScan = async () => {
        if (!message.trim()) {
            setError("Please enter a message to analyze.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log("Sending request with message:", message);

            const response = await fetch("http://127.0.0.1:5000/scan-message", {  // Fixed URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error details:", errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log("Received data:", data);

            setResult(data.classification || "Safe (No threats detected).");
        } catch (err) {
            console.error("Full error details:", err);
            setError("Error detecting threats: " + err.message);
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Threat Scanner</h2>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message for threat analysis..."
            />
            <br />
            <button onClick={handleScan} disabled={loading}>
                {loading ? "Analyzing..." : "Analyze"}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Possible Threats: {result}</p>
        </div>
    );
}

export default UrlClassifier;
