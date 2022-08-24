import "./Modal.css";
import React, { useState, useRef } from "react";
const Modal = ({ message, timer }) => {
  const [alert, setAlert] = useState(true);
  const handleAlert = () => {
    setAlert(false);
  };
  return (
    <div className="main__modal">
      {alert && (
        <div className="alert">
          <h4 className="message">{message}</h4>
          <div className="cross" onClick={handleAlert}>
            &#10060;
          </div>
        </div>
      )}
    </div>
  );
};
export default Modal;
