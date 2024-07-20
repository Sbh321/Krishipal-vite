import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsPersonFillGear,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsPaperclip,
} from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import "../Dashboard.css";

function Sidebar() {
  return (
    <aside id="sidebar">
      <Link to="/" className="main-link">
        <li className="sidebar-list-item rounded-lg  mt-2">
          <div className="flex items-center main">
            <FaHome className="icon mr-6" size={25} />
            <span>Krishipal</span>
          </div>
        </li>
      </Link>
      <ul className="sidebar-list mt-6">
        <Link to="/admin/dashboard">
          <li className="sidebar-list-item rounded-lg flex items-center">
            <BsGrid1X2Fill className="icon mr-6" /> <span>Dashboard</span>
          </li>
        </Link>

        <Link to="/admin/dashboard/users">
          <li className="sidebar-list-item rounded-lg flex items-center">
            <BsPeopleFill className="icon" /> Users
          </li>
        </Link>

        <Link to="/admin/dashboard/products">
          <li className="sidebar-list-item rounded-lg flex items-center">
            <BsFillArchiveFill className="icon" /> Products
          </li>
        </Link>

        <Link to="/admin/dashboard/orders">
          <li className="sidebar-list-item rounded-lg flex items-center">
            <BsFillArchiveFill className="icon" /> Orders
          </li>
        </Link>

        <Link to="/admin/dashboard/categories">
          <li className="sidebar-list-item rounded-lg flex items-center">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </li>
        </Link>

        <Link to="/admin/dashboard/admins">
          <li className="sidebar-list-item rounded-lg flex items-center">
            <BsPersonFillGear className="icon" /> Admins
          </li>
        </Link>

        <Link to="/admin/dashboard/blogs">
          <li className="sidebar-list-item rounded-lg flex items-center">
            <BsPaperclip className="icon" /> Blogs
          </li>
        </Link>

        {/* <li className="sidebar-list-item">
          <a href="">
            <BsListCheck className="icon" /> Inventory
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
