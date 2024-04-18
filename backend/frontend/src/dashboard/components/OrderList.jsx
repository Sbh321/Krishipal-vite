import React from "react";
import MUIDataTable from "mui-datatables";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
