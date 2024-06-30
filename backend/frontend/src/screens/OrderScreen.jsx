import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Confirmation from "../dashboard/confirm/Confirmation";
import { useDeleteOrderMutation } from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const { id: orderId } = useParams();

  const [deleteOrder] = useDeleteOrderMutation();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, errorPayPal, loadingPayPal]);

  function onApprove(data, actions) {
    // console.log("haha");
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment successful");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => orderId);
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleCancelOrder = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      await deleteOrder(orderId);
      toast.success("Order deleted successfully");
    } else {
      toast.error("Order deletion canceled");
    }
  };

  return isLoading ? (
    <div className="flex items-center justify-center gap-2">
      <CircularProgress size={64} style={{ color: "#718096" }} />
      <span className="text-gray-600">Loading ...</span>
    </div>
  ) : error ? (
    <Alert severity="error" className="mt-[10px]">
      Error...
    </Alert>
  ) : (
    <div className="mx-5 my-3">
      <h1 className="text-2xl font-bold">Order ID - {order._id}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Shipping</h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong> {order.user.email}
            </p>
            <p>
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                Delivered on {order.deliveredAt}
              </div>
            ) : (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                Not Delivered
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Payment Method</h2>
            <p>
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                Paid on {order.paidAt}
              </div>
            ) : (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                Not Paid
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <div
                className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
                role="alert"
              >
                Your order is empty
              </div>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-200 mb-4 pb-4"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`http://localhost:10000${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-md mr-4"
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <p>
                      {item.qty} x Rs.{item.price} = Rs.
                      {(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/3 md:pl-4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-2">Order Summary</h2>
              {order.isPaid && order.isDelivered && (
                <button
                  className=" px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white transition-colors duration-300"
                  onClick={handleCancelOrder}
                >
                  Delete Order
                </button>
              )}

              {!order.isPaid && !order.isDelivered && (
                <button
                  className=" px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white transition-colors duration-300"
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </button>
              )}
            </div>

            <div className="mb-2 flex justify-between">
              <span>Items</span>
              <span>Rs.{order.itemsPrice}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Shipping</span>
              <span>Rs.{order.shippingPrice}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Tax</span>
              <span>Rs.{order.taxPrice}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Total</span>
              <span>Rs.{order.totalPrice}</span>
            </div>

            {!order.isPaid && (
              <div className="mb-4">
                {loadingPay && (
                  <div className="flex items-center justify-center gap-2">
                    <CircularProgress size={64} style={{ color: "#718096" }} />
                    <span className="text-gray-600">Loading ...</span>
                  </div>
                )}
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <CircularProgress size={64} style={{ color: "#718096" }} />
                    <span className="text-gray-600">Loading ...</span>
                  </div>
                ) : (
                  <div>
                    {/* <button
                      onClick={onApproveTest}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-4 w-full"
                    >
                      Test Pay Order
                    </button> */}
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loadingDeliver && <div className="loader"></div>}

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div className="mb-4">
                  <button
                    onClick={deliverOrderHandler}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full"
                  >
                    Mark As Delivered
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
      {showConfirmation && (
        <Confirmation
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmation}
        />
      )}
    </div>
  );
};

export default OrderScreen;
