import React from "react";
import MUIDataTable from "mui-datatables";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const AdminListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

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
    return <div>No orders found.</div>;
  }

  const columns = ["ID", "NAME", "EMAIL"];

  const transformedData = users
    .filter((user) => user.isAdmin)
    .map((user) => [user._id, user.name, user.email]);

  const options = {
    filter: false,
    filterType: "checkbox",
    selectableRows: "none",
    rowsPerPage: 10,
  };
  return (
    <div className="my-4 mx-auto w-[800px] z-40">
      <MUIDataTable
        title={"Admins List"}
        data={transformedData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default AdminListScreen;
