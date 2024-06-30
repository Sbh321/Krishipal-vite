import React, { useState, useRef } from "react";
import MUIDataTable from "mui-datatables";
import {
  useGetProdQuery,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { FaEdit, FaRegTrashAlt, FaInfoCircle, FaImage } from "react-icons/fa";
import ProductEditModal from "../modals/ProductEditModal";
import ProductDescriptionModal from "../modals/ProductDescriptionModal";
import ProductImageModal from "../modals/ProductImageModal";
import { toast } from "react-hot-toast";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Confirmation from "../confirm/Confirmation";
import CustomToolbar from "./CustomToolbar";
import ProductCreateModal from "../modals/ProductCreateModal";

const ProductList = () => {
  const { data: products, isLoading, error, refetch } = useGetProdQuery();

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

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const handleDelete = (productId) => {
    setDeleteProductId(productId);
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      await deleteProduct(deleteProductId); // Use the deleteUserId state here
      toast.success("Product deleted successfully");
      refetch();
    } else {
      toast.error("Product deletion cancelled");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleEditButtonClick = (productId) => {
    setCurrentProductId(productId);
    setIsModalOpen(true);
  };

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

  if (!products || products.length === 0) {
    return <div>No products found.</div>;
  }

  const columns = [
    "ID",
    "NAME",
    "PRICE",
    "CATEGORY",
    "BRAND",
    "STOCK",
    "DESCRIPTION",
    "IMAGE",
    "ACTIONS",
  ];

  const transformedData = products.map((product) => [
    product._id,
    product.name,
    product.price,
    product.category,
    product.brand,
    product.countInStock,
    <button
      onClick={() => handleDescriptionButtonClick(product.description)}
      className="text-gray-500 text-2xl hover:shadow-lg hover:text-green-900"
    >
      <FaInfoCircle />
    </button>,
    <button
      onClick={() => handleImageButtonClick(product.image)}
      className="text-gray-500 text-2xl hover:shadow-lg hover:text-green-900"
    >
      <FaImage />
    </button>,
    <div key={product._id} className="flex items-center gap-1">
      <button
        onClick={() => handleEditButtonClick(product._id)}
        className="text-purple-600 text-2xl hover:shadow-lg hover:text-green-900"
      >
        <FaEdit />
      </button>

      <FaRegTrashAlt
        className="text-red-600 text-2xl cursor-pointer hover:shadow-lg hover:text-green-900"
        onClick={() => handleDelete(product._id)} // Pass productId to handleDelete
      />
    </div>,
  ]);

  return (
    <div>
      <div className="m-4">
        <MUIDataTable
          title={"Products List"}
          data={transformedData}
          columns={columns}
          options={options}
        />
      </div>
      {isModalOpen && (
        <ProductEditModal
          productId={currentProductId}
          closeModal={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      )}
      {showConfirmation && (
        <Confirmation
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmation}
        />
      )}
      {isCreateModalOpen && (
        <ProductCreateModal
          closeModal={() => {
            setIsCreateModalOpen(false);
            refetch();
          }}
        />
      )}
      {isDescriptionModalOpen && (
        <ProductDescriptionModal
          description={description} // Pass the description as prop
          closeModal={() => setIsDescriptionModalOpen(false)}
        />
      )}
      {isImageModalOpen && (
        <ProductImageModal
          image={image} // Pass the image URL as prop
          closeModal={() => setIsImageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
