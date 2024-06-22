import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsPalette,
  BsPaperclip,
} from "react-icons/bs";
import { useGetProdQuery } from "../../slices/productsApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoryApiSlice";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { useGetBlogsQuery } from "../../slices/blogsApiSlice";
import "./AdminHome.css";

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
        <h3 className="text-3xl">DASHBOARD</h3>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl">Statistics</h2>
      </div>

      <div className="main-cards">
        <div className="aCard">
          <div className="card-inner">
            <h3 className="text-2xl">PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1 className="text-2xl">{productsCount}</h1>
        </div>
        <div className="aCard">
          <div className="card-inner">
            <h3 className="text-2xl">CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1 className="text-2xl">{categoriesCount}</h1>
        </div>
        <div className="aCard">
          <div className="card-inner">
            <h3 className="text-2xl">USERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1 className="text-2xl">{usersCount}</h1>
        </div>
        <div className="aCard">
          <div className="card-inner">
            <h3 className="text-2xl">BLOGS</h3>
            <BsPaperclip className="card_icon" />
          </div>
          <h1 className="text-2xl">{blogsCount}</h1>
        </div>
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
