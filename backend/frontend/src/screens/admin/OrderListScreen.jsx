import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const OrderListScreen = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  return (
    <div className="mx-5">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <CircularProgress size={64} style={{ color: "#718096" }} />
          <span className="text-gray-600">Loading ...</span>
        </div>
      ) : error ? (
        <Alert severity="error" className="mt-[10px]">
          {error.data.message}
        </Alert>
      ) : (
        <div className="my-4">
          <p className="text-2xl text-accentDark mx-[50px]">Orders</p>
          <div className="sm:container p-6 mx-auto">
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                      ID
                    </th>
                    <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                      User
                    </th>
                    <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                      Date
                    </th>
                    <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                      Total
                    </th>
                    <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                      Paid
                    </th>
                    <th className="py-2 px-4 border-b text-left text-green-700 text-sm sm:text-base">
                      Delivered
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b text-sm sm:text-base">
                        {order._id}
                      </td>
                      <td className="py-2 px-4 border-b text-sm sm:text-base">
                        {(order.user && order.user.name) || "Deleted user"}
                      </td>
                      <td className="py-2 px-4 border-b text-sm sm:text-base">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="py-2 px-4 border-b text-sm sm:text-base">
                        {order.isPaid ? order.paidAt.substring(0, 10) : "X"}
                      </td>
                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : "X"}
                      </td>
                      <td className="py-2 px-4 border-b text-sm sm:text-base flex items-center space-x-4">
                        <div to={`/order/${order._id}`}>
                          <button>Details</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
