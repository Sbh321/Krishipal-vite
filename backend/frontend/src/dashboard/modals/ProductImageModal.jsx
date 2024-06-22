import React from "react";
import Modal from "./Modal";

const ProductImageModal = ({ image, closeModal }) => {
  console.log(image);
  return (
    <Modal closeModal={closeModal}>
      <div className="">
        <h2 className="text-2xl font-medium mb-4">Product Image</h2>
        <img
          src={`http://localhost:8000${image}`}
          alt="Product"
          className="w-full h-auto"
        />
      </div>
    </Modal>
  );
};

export default ProductImageModal;
