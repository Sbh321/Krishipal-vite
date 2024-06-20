import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import UserEditModal from "../modals/UserEditModal";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-hot-toast";

import Confirmation from "../confirm/Confirmation";

const options = {
  filterType: "checkbox",
  selectableRows: "none",
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 20, 50],
};

const UserList = () => {
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
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
      console.log("User deleted!");
    } else {
      console.log("Deletion canceled.");
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
        className="text-gray-500 text-2xl hover:shadow-lg hover:text-green-900"
      >
        <FaEdit />
      </button>

      <FaRegTrashAlt
        className="text-gray-500 text-2xl cursor-pointer hover:shadow-lg hover:text-green-900"
        onClick={() => handleDelete(user._id)} // Pass userId to handleDelete
      />
    </div>,
  ]);

  return (
    <div>
      <div className="m-4">
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
