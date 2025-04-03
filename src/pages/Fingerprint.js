import React, { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { FaCopy } from "react-icons/fa";
import "./Fingerprint.css";

function Fingerprint() {
  const [fingerprint, setFingerprint] = useState(null);
  const [details, setDetails] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
      collectBrowserInfo();
    };
    getFingerprint();
  }, []);

  const collectBrowserInfo = () => {
    const data = {
      "Browser Name": navigator.userAgent,
      "Platform": navigator.platform,
      "Screen Resolution": `${window.screen.width} x ${window.screen.height}`,
      "Language": navigator.language,
      "Time Zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      "Cookies Enabled": navigator.cookieEnabled ? "Yes" : "No",
      "WebGL Renderer": getWebGLInfo(),
    };
    setDetails(data);
  };

  const getWebGLInfo = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return "Not Supported";
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Unknown";
  };

  const handleCopy = () => {
    const textToCopy = `Unique Fingerprint ID: ${fingerprint}\n\n` + 
      Object.entries(details).map(([key, value]) => `${key}: ${value}`).join("\n");

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fingerprint-wrapper">
      <div className="fingerprint-container">
        <h2 className="fingerprint-title">🔒 Browser Fingerprint</h2>
        <div className="fingerprint-box">
          <p className="fingerprint-id">
            <strong>Unique Fingerprint ID:</strong> {fingerprint || "Loading..."}
          </p>
          <button className="fingerprint-copy-btn" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"} <FaCopy />
          </button>
        </div>
        <div className="fingerprint-info-box">
          {Object.entries(details).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fingerprint;
