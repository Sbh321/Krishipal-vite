import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsPaperclip,
} from "react-icons/bs";
import { useGetProdQuery } from "../../slices/productsApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoryApiSlice";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { useGetBlogsQuery } from "../../slices/blogsApiSlice";
import "./AdminHome.css";
import { Link } from "react-router-dom";

function AdminHome() {
  const { data: products } = useGetProdQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: users } = useGetUsersQuery();
  const { data: blogs } = useGetBlogsQuery();

  // Calculate counts
  const productsCount = products ? products.length : 0;
  const categoriesCount = categories ? categories.length : 0;
  const usersCount = users ? users.length : 0;
  const blogsCount = blogs ? blogs.length : 0;

  return (
    <main className="main-container">
      <div className="main-title">
        <h3 className="sm:text-3xl text-xl">DASHBOARD</h3>
      </div>

      <div className="mt-5">
        <h2 className="sm:text-2xl text-xl">Statistics</h2>
      </div>

      <div className="main-cards">
        <Link to="/admin/dashboard/products">
          <div className="aCard sm:flex-col w-[140px] sm:w-full bg-[#2962ff]">
            <div className="card-inner flex gap-24 ">
              <h3 className="sm:text-2xl text-xl">PRODUCTS</h3>
              <BsFillArchiveFill className="card_icon text-xl" />
            </div>
            <h1 className="text-2xl">{productsCount}</h1>
          </div>
        </Link>

        <Link to="/admin/dashboard/categories">
          <div className="aCard sm:flex-col w-[140px] sm:w-full bg-[#ff6d00]">
            <div className="card-inner flex gap-24">
              <h3 className="sm:text-2xl text-[17px]">CATEGORIES</h3>
              <BsFillGrid3X3GapFill className="text-2xl" />
            </div>
            <h1 className="text-2xl">{categoriesCount}</h1>
          </div>
        </Link>

        <Link to="/admin/dashboard/users">
          <div className="aCard sm:flex-col w-[140px] sm:w-full bg-[#2e7d32]">
            <div className="card-inner flex gap-24 ">
              <h3 className="sm:text-2xl text-xl">USERS</h3>
              <BsPeopleFill className="card_icon text-2xl" />
            </div>
            <h1 className="text-2xl">{usersCount}</h1>
          </div>
        </Link>

        <Link to="/admin/dashboard/blogs">
          <div className="aCard sm:flex-col w-[140px] sm:w-full bg-[#d50000]">
            <div className="card-inner flex gap-24 ">
              <h3 className="sm:text-2xl text-xl">BLOGS</h3>
              <BsPaperclip className="card_icon text-2xl" />
            </div>
            <h1 className="text-2xl">{blogsCount}</h1>
          </div>
        </Link>

        {/* <div className="aCard">
          <div className="card-inner">
            <h3 className="text-2xl">ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1 className="text-2xl">42</h1>
        </div> */}
      </div>
    </main>
  );
}

export default AdminHome;
