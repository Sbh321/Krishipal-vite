import React from "react";

const CategoryCard = ({ img, name, count }) => {
  return (
    <div className="border border-gray-200 hover:border-gray-300 hover:scale-105 transition-transform rounded-lg cursor-pointer">
      <div className="flex justify-between items-center p-6">
        <div className="space-y-4">
          <h3 className="font-medium text-xl">{name}</h3>
          {/* <p className="text-gray-500">{count}</p> */}
        </div>
        <img
          className="w-[50px] rounded-full h-[50px] object-cover"
          src={`http://localhost:8000${img}`}
          alt={name}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
