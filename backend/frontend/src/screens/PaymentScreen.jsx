import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="sm:container mx-5 mt-4">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <CheckOutSteps step1 step2 step3 />
        </div>
        <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <fieldset>
            <legend className="block mb-2">Select Method</legend>
            <div className="flex items-center">
              <input
                type="radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="PayPal" className="text-gray-700">
                PayPal or Credit Card
              </label>
            </div>
          </fieldset>
          <button
            type="submit"
            className="bg-accent text-white py-2 px-4 rounded-md hover:bg-accentDark focus:outline-none focus:bg-accentDark"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
