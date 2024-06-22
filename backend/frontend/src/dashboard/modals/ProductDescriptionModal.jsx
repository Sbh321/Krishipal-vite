import React from "react";
import Modal from "./Modal";

const ProductDescriptionModal = ({ description, closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="">
        <h2 className="text-2xl font-medium mb-4">Product Description</h2>
        <p>{description}</p>
      </div>
    </Modal>
  );
};

export default ProductDescriptionModal;
