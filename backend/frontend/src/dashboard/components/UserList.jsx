import React from "react";
import MUIDataTable from "mui-datatables";
import { useGetUsersQuery } from "../../slices/usersApiSlice";

const options = {
  filterType: "checkbox",
  selectableRows: "none",
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 20, 50],
};

const UserList = () => {
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
  ]);

  console.log(transformedData);

  return (
    <div className="m-4">
      <MUIDataTable
        title={"Users List"}
        data={transformedData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default UserList;
