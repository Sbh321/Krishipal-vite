import React from "react";
import Modal from "./Modal";

const BlogDescriptionModal = ({ description, closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="">
        <h2 className="text-2xl font-medium mb-4">Blog Description</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </Modal>
  );
};

export default BlogDescriptionModal;
