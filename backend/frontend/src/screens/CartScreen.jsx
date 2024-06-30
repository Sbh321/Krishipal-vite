import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { FaTrash } from "react-icons/fa";

const CartScreen = () => {
  useEffect(() => {
    document.title = "Krishipal | Cart";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addTOCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login/?redirect=/shipping");
  };

  return (
    <div className="container">
      <div className="">
        <p className="text-4xl mt-4">Shopping Cart</p>
      </div>

      <div className="md:flex gap-3">
        <div className="md:w-2/3">
          {cartItems.length === 0 ? (
            <Alert severity="error" className="mt-[10px]">
              Cart is empty!
            </Alert>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  className="flex gap-3 items-center border-b border-gray-200 py-4"
                  key={item._id}
                >
                  <div className="w-1/5 flex justify-between">
                    <img
                      src={`http://localhost:10000${item.image}`}
                      alt="image"
                      className="w-full rounded-md"
                    />
                  </div>
                  <div className="w-1/5">
                    <p className="">{item.name}</p>
                  </div>
                  <div className="w-1/5">
                    <p>Rs. {item.price}</p>
                  </div>
                  <div className="w-1/5">
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        addTOCartHandler(item, Number(e.target.value));
                      }}
                      className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400 bg-white w-full"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/5 pl-4">
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:w-1/3 md:mt-0 mt-3">
          <div className="border border-gray-300 rounded-md">
            <div className="py-2 px-4">
              <p className="text-3xl">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </p>
            </div>
            <div className="flex py-2 px-4 border-b border-gray-300">
              <p>
                Rs.{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </div>

            <div className="py-2 px-4 border-b border-gray-300">
              <button
                type="button"
                className="bg-accent hover:bg-accentDark text-white px-4 py-2 mt-2 rounded cursor-pointer"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
