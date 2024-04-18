import React from "react";
import { Link } from "react-router-dom";

const ExploreBtn = () => {
  return (
    <div className="flex flex-row justify-center container mt-10 rounded">
      <Link to={"/shop"}>
        <button className="text-white tracking-[-0.50px] font-medium min-w-[218px] h-[60px] px-[35px] text-xl bg-accent border hover:border-slate-600 hover:border-2 hover:bg-white transition-all hover:text-slate-600 rounded-md">
          Explore
        </button>
      </Link>
    </div>
  );
};

export default ExploreBtn;
