import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';

export const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className={`fas fa-${alert.className}`}></i>&nbsp; {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
