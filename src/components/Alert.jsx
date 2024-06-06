import React, { useState, useEffect } from 'react';
import './Alert.css';

let showAlertHandler;

const Alert = () => {
  const [alert, setAlert] = useState({ show: false, message: '' });

  useEffect(() => {
    showAlertHandler = (message) => {
      setAlert({ show: true, message });
      setTimeout(() => {
        setAlert({ show: false, message: '' });
      }, 2000);
    };
  }, []);

  return (
    <>
      {alert.show && (
        <div className="alert">
          {alert.message}
        </div>
      )}
    </>
  );
};

export const showAlert = (message) => {
  if (showAlertHandler) {
    showAlertHandler(message);
  }
};

export default Alert;
