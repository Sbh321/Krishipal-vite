import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";
import Alert from "@mui/material/Alert";

const Cart = ({ setShowCart }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  // const checkOutHandler = () => {
  //   navigate("/login/?redirect=/shipping");
  // };

  return (
    <div
      className="bg-[#0000007d] w-full h-screen fixed left-0 top-0 z-20"
      onClick={() => setShowCart(false)}
    >
      <div
        className="max-w-[400px] w-full h-full bg-white absolute right-0 top-0 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross1
          className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer"
          onClick={() => setShowCart(false)}
        />

        <h3 className="pt-6 text-lg font-medium text-gray-600 uppercase">
          Your Cart
        </h3>
        {cartItems.length === 0 ? (
          <Alert severity="error" className="mt-[10px]">
            Cart is empty.
          </Alert>
        ) : (
          <div className="mt-6">
            {cartItems?.map((el) => (
              <div className="flex justify-between items-center my-4">
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:8000${el.image}`}
                    alt="img"
                    className="h-[100px] rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{el.name}</h3>
                    <p className="text-gray-600">
                      {el.qty} x Rs. {el.price}
                    </p>
                  </div>
                </div>

                <div className="p-1 hover:border hover:border-black hover:rounded-md cursor-pointer">
                  <RxCross1 onClick={() => removeFromCartHandler(el._id)} />
                </div>
              </div>
            ))}
          </div>
        )}

        <Link to={"/cart"}>
          <button
            className="bg-accent text-white text-center w-full rounded-3xl py-2 mb-4 hover:bg-accentDark mt-4"
            onClick={() => setShowCart(false)}
          >
            View Cart Details
          </button>
          <button
            className="bg-accent text-white text-center w-full rounded-3xl py-2 hover:bg-accentDark"
            onClick={() => setShowCart(false)}
          >
            CheckOut
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
