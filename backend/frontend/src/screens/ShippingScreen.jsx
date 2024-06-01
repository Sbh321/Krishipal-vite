import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="container mt-4">
      <div className="max-w-xl mx-auto">
        <CheckOutSteps step1 step2 />
        <h1 className="text-2xl font-bold mb-4">Shipping</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="my-2">
            <label htmlFor="address" className="block">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="my-2">
            <label htmlFor="city" className="block">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="my-2">
            <label htmlFor="postalCode" className="block">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="my-2">
            <label htmlFor="country" className="block">
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
          </div>

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

export default ShippingScreen;
