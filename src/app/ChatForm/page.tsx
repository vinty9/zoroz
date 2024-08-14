"use client";  // This marks the file as a Client Component

import React, { useState } from 'react';
import { FaComment } from 'react-icons/fa';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-max h-max flex flex-col items-center fixed right-6 z-40 bottom-28">
        <span className="font-semibold text-sm">Chat Now!</span>
        <button
          onClick={toggleForm}
          className="h-10 w-10 rounded-full flex items-center justify-center bg-green-600 text-white border-[1px] border-green mt-2 hover:scale-110 transform transition-transform"
        >
          <FaComment className="text-lg" />
        </button>
      </div>

      {/* Form Modal */}
      {isOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-2xl font-semibold text-red-500 mb-4">Contact Us</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-red-500 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-red-500 rounded focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-red-500 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-red-500 rounded focus:outline-none"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-red-500 font-semibold mb-2">Phone</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-red-500 rounded focus:outline-none"
                    placeholder="Your Phone"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleForm}
          ></div>
        </>
      )}
    </>
  );
};

export default ChatButton;
