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

        <li className="sidebar-list-item">
          <Link to="/admin/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/dashboard/users">
            <BsPeopleFill className="icon" /> Users
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/dashboard/products">
            <BsFillArchiveFill className="icon" /> Products
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/dashboard/orders">
            <BsFillArchiveFill className="icon" /> Orders
          </Link>
        </li>

        {/* <li className="sidebar-list-item">
          <a href="">
            <BsPaperclip className="icon" /> Blogs
          </a>
        </li> */}

        <li className="sidebar-list-item">
          <a href="">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsPersonFillGear className="icon" /> Admins
          </a>
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
