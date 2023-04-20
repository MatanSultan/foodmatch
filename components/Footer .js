import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <h2 className="text-xl font-bold text-white mb-2">matan sultan </h2>
        
          </div>
          <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <h2 className="text-xl font-bold text-white mb-2">Links</h2>
            <ul className="list-none">
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/3">
            <h2 className="text-xl font-bold text-white mb-2">
              Connect With Us
            </h2>
            <ul className="list-none">
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
