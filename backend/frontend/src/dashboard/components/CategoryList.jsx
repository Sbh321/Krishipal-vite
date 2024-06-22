import React, { useState, useEffect, useRef } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CategoryCreateModal from "../modals/CategoryCreateModal";
import CategoryEditModal from "../modals/CategoryEditModal";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../slices/categoryApiSlice"; // Import the query and mutation hooks
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Confirmation from "../confirm/Confirmation";
import { toast } from "react-hot-toast";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const CategoryList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const {
    data: categoryData,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [deleteCategory] = useDeleteCategoryMutation();

  // Store refetch function in a ref
  const refetchCategories = useRef(refetch);

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  const handleAddCategory = () => {
    setIsCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
    // Call refetch after closing modal
    refetchCategories.current();
  };

  const handleEditButtonClick = (categoryId) => {
    setCurrentCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const handleDelete = async (categoryId) => {
    setDeleteCategoryId(categoryId);
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      await deleteCategory(deleteCategoryId);
      toast.success("Category deleted successfully");
      refetch();
      console.log("Category deleted!");
    } else {
      console.log("Deletion canceled.");
    }
  };

  const CustomToolbar = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddCategory}
      >
        Add Category
      </Button>
    );
  };

  const options = {
    filter: false,
    filterType: "checkbox",
    selectableRows: "none",
    rowsPerPage: 10,
    customToolbar: () => {
      return <CustomToolbar />;
    },
  };

  const columns = ["Name", "Image", "Description", "Actions"];

  // Transform the category data to fit the table structure
  const data = categories.map((category) => [
    category.name,
    <div key={category.image}>
      <img
        src={`http://localhost:8000${category.image}`}
        alt={category.name}
        className="w-10 h-10 rounded-full object-cover"
      />
    </div>,
    category.description,
    <div key={category._id} className="flex items-center gap-1">
      <button
        onClick={() => handleEditButtonClick(category._id)}
        className="text-purple-600 text-2xl hover:shadow-lg hover:text-green-900"
      >
        <FaEdit />
      </button>

      <FaRegTrashAlt
        className="text-red-600 text-2xl cursor-pointer hover:shadow-lg hover:text-green-900"
        onClick={() => handleDelete(category._id)} // Pass categoryId to handleDelete
      />
    </div>,
  ]);

  return (
    <div className="mx-40 my-4 z-40">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading categories</p>}

      {!isLoading && !error && (
        <MUIDataTable
          title={"Category List"}
          data={data}
          columns={columns}
          options={options}
        />
      )}

      {isCreateModalOpen && (
        <CategoryCreateModal closeModal={handleModalClose} />
      )}

      {isModalOpen && (
        <CategoryEditModal
          categoryId={currentCategoryId}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      {showConfirmation && (
        <Confirmation
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmation}
        />
      )}
    </div>
  );
};

export default CategoryList;
