import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
import { BsRobot,BsShieldLock } from 'react-icons/bs';
import { FaShieldAlt, FaLock, FaUserShield, FaBug } from 'react-icons/fa';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

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

  const handlePlay = () => {
    setIsPlaying(true);
    document.querySelector(".promo-video").play();
  };

  return (
    <div>
      <Header />
      <main className="home-container">
        <h1>Welcome to CypherSleuth</h1>
        <p className='mm'>Your trusted cybersecurity platform for detecting and preventing online threats.</p>
        <button className="get-started-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </main>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>At CypherSleuth, we are committed to safeguarding the digital space by providing intelligent solutions for cybersecurity threats. Our platform offers real-time detection and prevention mechanisms to keep users safe from online vulnerabilities.</p>
        <div className="about-cards">
          <div className="card">
            <FaShieldAlt size={40} color="#e50914" />
            <h3>Advanced Threat Detection</h3>
            <p>Our AI-driven algorithms detect and prevent phishing attacks, spam, and malware threats in real time.</p>
          </div>
          <div className="card">
            <FaLock size={40} color="#e50914" />
            <h3>Data Security & Privacy</h3>
            <p>We ensure data privacy through encryption and security protocols, keeping your sensitive information protected.</p>
          </div>
          <div className="card">
            <FaUserShield size={40} color="#e50914" />
            <h3>User Awareness & Protection</h3>
            <p>Educating users about cybersecurity threats and offering tools to enhance their online security.</p>
          </div>
          <div className="card">
            <FaBug size={40} color="#e50914" />
            <h3>AI-Powered Cyber Defense</h3>
            <p>Leveraging machine learning and AI to identify and mitigate cyber risks effectively.</p>
          </div>
          <div className="card">
      <BsRobot size={40} color="#e50914" />
      <h3>GenAI Chatbot</h3>
      <p>Get instant cybersecurity insights and recommendations with our AI-powered assistant.</p>
    </div>
        </div>
      </section>
     
      {/* Video Section */}
      <section className="video-section">
        <h2>Empowering You Against Cyber Attacks</h2>
        <div className="video-wrapper">
          <video 
            className="promo-video" 
            controls 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/promo-video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <div className="video-overlay">
              <button className="play-button" onClick={handlePlay}>
                ▶
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="services">
      <h2 className="services-title">Our Services</h2>
      <p className="services-description">
        Protect yourself from cyber threats with our advanced AI-powered security solutions.
      </p>

      <div className="services-grid">
        {[
          {
            icon: "fa-shield-alt",
            title: "Spam Detection",
            description: "Detects and filters malicious emails and messages in real-time.",
          },
          {
            icon: "fa-bug",
            title: "Attack Classification",
            description: "Classifies threats as spam, phishing, MITM, or DoS attacks.",
          },
          {
            icon: "fa-lock",
            title: "Password Strength Checker",
            description: "Analyzes password strength and security vulnerabilities.",
          },
          {
            icon: "fa-user-shield",
            title: "Two-Factor Authentication",
            description: "Adds an extra security layer to prevent unauthorized access.",
          },
          {
            icon: "fa-exclamation-triangle",
            title: "Report a Breach",
            description: "Enables users to report security breaches for quick mitigation.",
          },
          {
            icon: "fa-newspaper",
            title: "Cybersecurity News",
            description: "Stay updated with the latest threats and security trends.",
          },
          {
            icon: "fa-fingerprint",
            title: "Browser Fingerprinting Detection",
            description: "Detects and alerts users if their browser is being fingerprinted.",
          },
          {
            icon: "fa-robot",
            title: "AI-Powered Cyber Chatbot",
            description: "Get instant cybersecurity guidance through our GenAI chatbot.",
          },
        ].map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-icon">
              <i className={`fas ${service.icon}`}></i>
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
     {/* Contact Section */}
     <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions or need assistance? Reach out to us.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
          <button type="submit">Send Message</button>
        </form>
         {/* Social Media Icons */}
         <div className="social-icons">
          <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon linkedin" />
          </a>
          <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon instagram" />
          </a>
          <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon twitter" />
          </a>
          <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="social-icon whatsapp" />
          </a>
        </div>
      </section>
      <Footer />
      
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
    </div>
  );
}

export default Home;
