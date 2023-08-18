import React from "react";

const Alert = ({ message, type }) => {
  return (
    <div
      className={`bg-${type}-100 border-l-4 border-${type}-500 text-${type}-700 p-4`}
      role="alert"
    >
      <p className="font-bold">{type.toUpperCase()}: </p>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
