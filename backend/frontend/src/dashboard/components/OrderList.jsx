import React from "react";
import MUIDataTable from "mui-datatables";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();

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

  if (!orders) {
    return <div>No orders found.</div>;
  }

  const columns = [
    "ID",
    "USER",
    "DATE",
    "TOTAL",
    "PAID",
    "DELIVERED",
    "ACTIONS",
  ];

  const transformedData = orders.map((order) => [
    order._id,
    (order.user && order.user.name) || "Deleted user",
    order.createdAt.substring(0, 10),
    `Rs ${order.totalPrice}`,
    order.isPaid ? order.paidAt.substring(0, 10) : "❌",
    order.isDelivered ? order.deliveredAt.substring(0, 10) : "❌",
    <div key={order._id} className="flex items-center gap-1">
      <Link to={`/order/${order._id}`} className="text-green-500">
        <button className="text-black p-1 rounded-lg hover:shadow-lg hover:text-green-900 focus:outline-none">
          Details
        </button>
      </Link>

      {/* <FaRegTrashAlt
        className="text-gray-500 text-2xl cursor-pointer hover:shadow-lg hover:text-green-900"
        onClick={() => handleDelete(user._id)} // Pass userId to handleDelete
      /> */}
    </div>,
  ]);

  return (
    <div>
      <div className="m-4">
        <MUIDataTable
          title={"Orders List"}
          data={transformedData}
          columns={columns}
          options={{
            filterType: "checkbox",
            selectableRows: "none",
            rowsPerPage: 10,
            rowsPerPageOptions: [5, 10, 20, 50],
          }}
        />
      </div>
    </div>
  );
};

export default OrderList;
