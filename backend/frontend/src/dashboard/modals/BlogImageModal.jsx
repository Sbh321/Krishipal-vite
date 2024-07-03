import React from "react";
import Modal from "./Modal";

const BlogImageModal = ({ image, closeModal }) => {
  console.log(image); // Optional: log image for debugging
  return (
    <Modal closeModal={closeModal}>
      <div className="">
        <h2 className="text-2xl font-medium mb-4">Blog Image</h2>
        <img
          src={`${import.meta.env.VITE_APP_API_URL}${image}`} // Replace with your actual image URL
          alt="Blog"
          className="w-full h-auto"
        />
      </div>
    </Modal>
  );
};

export default BlogImageModal;
