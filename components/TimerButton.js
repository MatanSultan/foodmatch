import React from "react";
import Link from "next/link";

const TimerButton = () => {
  return (
    <Link href="/timer" passHref>
      <button
        className="flex items-center justify-center h-10 px-4 bg-blue-900 hover:bg-blue-200 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        aria-label="Timer"
      >
        <svg
          className="h-6 w-6 mr-2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 6v6l4 2" />
          <path d="M21.5 15l-3 1.5M21.5 18l-3-1.5M3 3h18v18H3V3z" />
        </svg>
        Timer
      </button>
    </Link>
  );
};

export default TimerButton;
