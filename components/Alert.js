import React from "react";

const Alert = ({ message, type }) => {
  const backgroundColor =
    type === "success"
      ? "bg-green-500"
      : type === "warning"
      ? "bg-yellow-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div className={`${backgroundColor} py-2 px-4 rounded-md text-white`}>
      {message}
    </div>
  );
};

export default Alert;
