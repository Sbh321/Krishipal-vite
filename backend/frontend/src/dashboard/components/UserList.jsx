import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import UserEditModal from "../modals/UserEditModal";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-hot-toast";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Confirmation from "../confirm/Confirmation";

const UserList = () => {
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null); // State to store the id to delete

  const handleDelete = (userId) => {
    setDeleteUserId(userId); // Set the userId to delete
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      await deleteUser(deleteUserId); // Use the deleteUserId state here
      toast.success("User deleted successfully");
      refetch();
    } else {
      toast.error("User deletion cancelled");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleEditButtonClick = (userId) => {
    setCurrentUserId(userId);
    setIsModalOpen(true);
  };

  const { data: users, refetch, error, isLoading } = useGetUsersQuery();

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

  if (!users) {
    return <div>No users found.</div>;
  }

  const columns = ["ID", "NAME", "EMAIL", "ADMIN", "ACTIONS"];

  const transformedData = users.map((user) => [
    user._id,
    user.name,
    user.email,
    user.isAdmin ? "Yes" : "No",
    <div key={user._id} className="flex items-center gap-1">
      <button
        onClick={() => handleEditButtonClick(user._id)}
        className="text-purple-600 text-2xl hover:shadow-lg hover:text-green-900"
      >
        <FaEdit />
      </button>

      <FaRegTrashAlt
        className="text-red-600 text-2xl cursor-pointer hover:shadow-lg hover:text-green-900"
        onClick={() => handleDelete(user._id)} // Pass userId to handleDelete
      />
    </div>,
  ]);

  const options = {
    filter: false,
    filterType: "checkbox",
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20, 50],
    // customToolbar: () => (
    //   <CustomToolbar handleClick={handleCustomButtonClick} />
    // ),
  };

  return (
    <div>
      <div className="m-4 z-40">
        <MUIDataTable
          title={"Users List"}
          data={transformedData}
          columns={columns}
          options={options}
        />
      </div>

      {isModalOpen && (
        <UserEditModal
          userId={currentUserId}
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

export default UserList;
