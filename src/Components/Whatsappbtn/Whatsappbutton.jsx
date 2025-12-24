import React from "react";
import "./Whatsappbutton.css";

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/923124936717" // WhatsApp link with country code
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
      />
    </a>
  );
};

export default WhatsappButton;
