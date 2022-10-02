import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, groceryList }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [groceryList]);
  //console.log(props.alert);
  //use effect to toggle show and hide for a few seconds display: none
  //
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
