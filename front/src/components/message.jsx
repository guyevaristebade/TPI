import React, { useState, useEffect } from 'react';
import '../assets/message.scss';

export const Message = ({ type, content }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className={`message ${type} ${visible ? 'show' : 'hide'}`}>
      <div className="message-content">{content}</div>
      <button className="close-button" onClick={handleClose}>X</button>
    </div>
  );
};
