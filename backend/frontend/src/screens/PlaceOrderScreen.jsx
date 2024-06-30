import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import CheckOutSteps from "../components/CheckOutSteps";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="sm:container mx-5 mt-4">
      <CheckOutSteps step1 step2 step3 step4 />
      <div className="md:flex">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Shipping</h2>
            <p className="mb-4">
              <strong>Address:</strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center justify-between border-b border-gray-200 mb-4 pb-4"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`http://localhost:10000${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-md mr-4"
                      />
                      <Link
                        to={`/product/${item._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <p>
                      {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="md:w-1/3 pl-4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="mb-2 flex justify-between">
              <span>Items</span>
              <span>Rs.{cart.itemsPrice}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Shipping</span>
              <span>Rs.{cart.shippingPrice}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Tax</span>
              <span>Rs.{cart.taxPrice}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span>Total</span>
              <span>Rs.{cart.totalPrice}</span>
            </div>
            <div>{error && <div>{error.data.message}</div>}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <button
              type="button"
              className="bg-accent text-white py-2 px-4 rounded-md hover:bg-accentDark focus:outline-none focus:bg-accentDark w-full"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            {isLoading && (
              <div className="flex items-center justify-center gap-2">
                <CircularProgress size={64} style={{ color: "#718096" }} />
                <span className="text-gray-600">Loading ...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
