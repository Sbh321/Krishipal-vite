import React from "react";

const CartCountBadge = () => {
  return (
    <div
      className={`absolute bg-red-600 text-white text-[14px] -right-3 -top-1 rounded-full grid place-items-center w-4 h-4`}
    >
      <p className="text-[10px]">0</p>
    </div>
  );
};

export default CartCountBadge;
