import React from "react";

const CartCountBadge = ({ cartItems }) => {
  const totalQuantity = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <div
      className={`absolute bg-red-600 text-white text-[14px] -right-3 -top-1 rounded-full grid place-items-center w-4 h-4`}
    >
      <p className="text-[10px]">{totalQuantity}</p>
    </div>
  );
};

export default CartCountBadge;
