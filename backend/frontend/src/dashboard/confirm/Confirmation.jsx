import React from "react";

const Confirmation = ({ message, onConfirm }) => {
  const handleConfirm = (confirmed) => {
    onConfirm(confirmed);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="bg-white p-4 rounded shadow-md text-center">
        <p className="mb-4 text-black">{message}</p>
        <div>
          <button
            className="mr-2 px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white transition-colors duration-300"
            onClick={() => handleConfirm(true)}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white transition-colors duration-300"
            onClick={() => handleConfirm(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
