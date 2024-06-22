import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../slices/categoryApiSlice";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { useUploadProductImageMutation } from "../../slices/productsApiSlice";

const CategoryEditModal = ({ closeModal, categoryId }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Start fade-in when the component mounts
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Start fade-out
    setTimeout(() => {
      closeModal(); // Actually close after fade-out
    }, 300); // Match the duration of the fade-out effect
  };

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: category,
    error,
    isLoading,
    refetch,
  } = useGetCategoryByIdQuery(categoryId);

  const [updateCategory, { isLoading: isLoadingUpdate }] =
    useUpdateCategoryMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setName(category.name);
      setImage(category.image);
      setDescription(category.description);
    }
  }, [category]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedCategory = {
      categoryId,
      name,
      image,
      description,
    };

    try {
      await updateCategory(updatedCategory).unwrap();
      toast.success("Category updated");
      refetch();
      handleClose();
    } catch (err) {
      toast.error("Failed to update category");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`absolute inset-0 bg-gray-900 transition-opacity duration-300 ${
          isVisible ? "opacity-50" : "opacity-0"
        }`}
      ></div>
      <div
        className={`bg-white p-6 rounded shadow-lg relative z-10 w-11/12 max-w-lg transform transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl focus:outline-none"
        >
          &times;
        </button>

        <h1 className="text-2xl font-semibold mb-4 text-black">
          Edit Category
        </h1>

        {isLoadingUpdate && (
          <div className="flex items-center justify-center gap-2 mt-[10px]">
            <CircularProgress size={64} style={{ color: "#718096" }} />
            <span className="text-gray-600">Loading ...</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 mt-[10px]">
            <CircularProgress size={64} style={{ color: "#718096" }} />
            <span className="text-gray-600">Loading ...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="mb-4 flex items-center">
              <label className="block text-gray-700 mb-2 w-1/4" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-3/4 p-2 border border-gray-300 rounded text-gray-700"
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block text-gray-700 mb-2 w-1/4" htmlFor="image">
                Image
              </label>
              <div className="flex w-3/4 items-center">
                <input
                  type="text"
                  id="image"
                  placeholder="Enter Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-2/3 p-2 border border-gray-300 rounded mr-2 text-gray-700"
                />
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className="w-1/3"
                />
              </div>
            </div>

            <div className="mb-4 flex items-center">
              <label
                className="block text-gray-700 mb-2 w-1/4"
                htmlFor="description"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-3/4 p-2 border border-gray-300 rounded text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CategoryEditModal;
