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
import { Link } from "react-router-dom";
import "./Sidebar.css";
import "../Dashboard.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      {/* <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div> */}

      <ul style={{ marginTop: "50px" }} className="sidebar-list">
        {/* change a tags to link later on */}

        <Link to="/admin/dashboard">
          <li className="sidebar-list-item flex items-center">
            <BsGrid1X2Fill className="icon mr-6" /> <span>Dashboard</span>
          </li>
        </Link>

        <Link to="/admin/dashboard/users">
          <li className="sidebar-list-item flex items-center">
            <BsPeopleFill className="icon" /> Users
          </li>
        </Link>

        <Link to="/admin/dashboard/products">
          <li className="sidebar-list-item flex items-center">
            <BsFillArchiveFill className="icon" /> Products
          </li>
        </Link>

        <Link to="/admin/dashboard/orders">
          <li className="sidebar-list-item flex items-center">
            <BsFillArchiveFill className="icon" /> Orders
          </li>
        </Link>

        {/* <li className="sidebar-list-item">
          <a href="">
            <BsPaperclip className="icon" /> Blogs
          </a>
        </li> */}

        <li className="sidebar-list-item flex items-center">
          <BsFillGrid3X3GapFill className="icon" /> Categories
        </li>

        <li className="sidebar-list-item flex items-center">
          <BsPersonFillGear className="icon" /> Admins
        </li>

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
