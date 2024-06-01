import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartCountBadge from "./CartCountBadge";
import Cart from "./Cart";

const OnScrollCartIcon = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  //Sticky cart icon on scroll
  // State to track whether cart item should be displayed
  const [showCart, setShowCart] = useState(false);

  // Event listener for scrolling
  const handleScroll = () => {
    if (window.scrollY > 100) {
      //Desired scroll position
      setShowCart(true);
    } else {
      setShowCart(false);
    }
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showCart]);

  return (
    <>
      {!isCartOpen && (
        <div className="cart sticky top-3 z-50">
          {cartItems.length > 0 && showCart && (
            <div className="flex justify-end cart sticky top-3 z-50 m-4">
              <div
                className="cursor-pointer bg-accent inline-block min-w-min min-h-min p-3 rounded-full"
                onClick={toggleCart}
              >
                <div className="relative">
                  <AiOutlineShoppingCart
                    size={35}
                    color="white"
                    style={{ marginTop: "3px" }}
                  />

                  <CartCountBadge
                    size="w-[25px] h-[25px] absolute"
                    cartItems={cartItems}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {isCartOpen && <Cart setShowCart={setIsCartOpen} />}
    </>
  );
};

export default OnScrollCartIcon;
