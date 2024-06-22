import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

const Modal = ({ closeModal, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-full max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div className="modal-header flex justify-end pt-2 pr-4">
          <button
            className="modal-close text-gray-500 hover:text-gray-900"
            onClick={closeModal}
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <div className="modal-content pr-4 pl-4 pb-4">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") // Make sure #modal-root exists in your HTML
  );
};

export default Modal;
