import React, { useState } from "react";
import { BsRobot } from "react-icons/bs";
import "./Chatbot.css"; // Make sure to create this CSS file

function Chatbot() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message to chat
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      console.log("Bot response:", data);

      const botResponse = { text: data.response || "Something went wrong.", sender: "bot" };
      setMessages((prev) => [...prev, botResponse]);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChat}>
        <BsRobot size={40} color="#0ff" />
      </div>

      {/* Chatbox */}
      {chatOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <span>Chatbot</span>
            <button onClick={toggleChat}>×</button>
          </div>
          <div className="chatbox-content">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about cybersecurity..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
