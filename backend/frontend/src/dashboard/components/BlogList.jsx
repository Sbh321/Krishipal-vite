import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
} from "../../slices/blogsApiSlice"; // Adjust according to your API slice
import { FaEdit, FaRegTrashAlt, FaInfoCircle, FaImage } from "react-icons/fa";
import BlogEditModal from "../modals/BlogEditModal";
import BlogDescriptionModal from "../modals/BlogDescriptionModal";
import BlogImageModal from "../modals/BlogImageModal";
import { toast } from "react-hot-toast";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Confirmation from "../confirm/Confirmation";
import CustomToolbar from "./CustomToolbar";
import BlogCreateModal from "../modals/BlogCreateModal";

const BlogList = () => {
  const options = {
    filter: false,
    filterType: "checkbox",
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20, 50],
    customToolbar: () => <CustomToolbar handleClick={handleCreate} />,
  };

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [description, setDescription] = useState(""); // State to hold description
  const [image, setImage] = useState(""); // State to hold image URL

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const [deleteBlog, { isLoading: loadingDelete }] = useDeleteBlogMutation();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(null); // State to store the id to delete

  const handleDelete = (blogId) => {
    setDeleteBlogId(blogId);
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      await deleteBlog(deleteBlogId); // Use the deleteBlogId state here
      toast.success("Blog deleted successfully");
      refetch();
      toast.success("Blog deleted successfully");
      console.log("Blog deleted!");
    } else {
      toast.error("Deletion canceled");
      console.log("Deletion canceled.");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  const handleEditButtonClick = (blogId) => {
    setCurrentBlogId(blogId);
    setIsModalOpen(true);
  };

  const { data: blogs, isLoading, refetch, error } = useGetBlogsQuery();

  const handleDescriptionButtonClick = (description) => {
    setDescription(description); // Set description for modal
    setIsDescriptionModalOpen(true);
  };

  const handleImageButtonClick = (image) => {
    setImage(image); // Set image URL for modal
    setIsImageModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 mt-[10px]">
        <CircularProgress size={64} style={{ color: "#718096" }} />
        <span className="text-gray-600">Loading ...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="mt-[10px]">
        Error! Please Reload the page
      </Alert>
    );
  }

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found.</div>;
  }

  const columns = ["ID", "TITLE", "DESCRIPTION", "IMAGE", "ACTIONS"];

  const transformedData = blogs.map((blog) => [
    blog._id,
    blog.title,
    <button
      onClick={() => handleDescriptionButtonClick(blog.description)}
      className="text-gray-500 text-2xl hover:shadow-lg hover:text-green-900"
    >
      <FaInfoCircle />
    </button>,
    <button
      onClick={() => handleImageButtonClick(blog.image)}
      className="text-gray-500 text-2xl hover:shadow-lg hover:text-green-900"
    >
      <FaImage />
    </button>,
    <div key={blog._id} className="flex items-center gap-1">
      <button
        onClick={() => handleEditButtonClick(blog._id)}
        className="text-purple-600 text-2xl hover:shadow-lg hover:text-green-900"
      >
        <FaEdit />
      </button>

      <FaRegTrashAlt
        className="text-red-600 text-2xl cursor-pointer hover:shadow-lg hover:text-green-900"
        onClick={() => handleDelete(blog._id)} // Pass blogId to handleDelete
      />
    </div>,
  ]);

  return (
    <div>
      <div className="m-4">
        <MUIDataTable
          title={"Blogs List"}
          data={transformedData}
          columns={columns}
          options={options}
        />
      </div>
      {isModalOpen && (
        <BlogEditModal
          blogId={currentBlogId}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      {showConfirmation && (
        <Confirmation
          message="Are you sure you want to delete this blog?"
          onConfirm={handleConfirmation}
        />
      )}
      {isCreateModalOpen && (
        <BlogCreateModal closeModal={() => setIsCreateModalOpen(false)} />
      )}
      {isDescriptionModalOpen && (
        <BlogDescriptionModal
          description={description} // Pass the description as prop
          closeModal={() => setIsDescriptionModalOpen(false)}
        />
      )}
      {isImageModalOpen && (
        <BlogImageModal
          image={image} // Pass the image URL as prop
          closeModal={() => setIsImageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BlogList;
