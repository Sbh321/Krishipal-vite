import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullNameOpen, setIsFullNameOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleFullNameDropdown = () => {
    console.log("click full name");
    setIsFullNameOpen(!isFullNameOpen);
  };

  const toggleAdminDropdown = () => {
    setIsAdminOpen(!isAdminOpen);
  };

  return (
    <div className=" border-b border-gray-300">
      <nav className="bg-white container">
        <div className="w-[98%] mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className=" flex items-center">
                <span className=" text-green-700 font-medium text-3xl">
                  <Link to={"/"}>Krishipal</Link>
                </span>
              </div>
            </div>

            <div className="md:flex hidden ml-36">
              <div className="ml-auto flex items-center gap-6">
                <a href="#" className="hover:text-gray-500 px-3 py-2">
                  Home
                </a>
                <a href="#" className="hover:text-gray-500 px-3 py-2">
                  About
                </a>
                <a href="#" className=" hover:text-gray-500 px-3 py-2">
                  Advice
                </a>
                <a href="#" className=" hover:text-gray-500 px-3 py-2">
                  Blogs
                </a>
                <a href="#" className=" hover:text-gray-500 px-3 py-2">
                  Contact
                </a>
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <div
                className="relative cursor-pointer"
                // onClick={() => setShowCart(true)}
              >
                <AiOutlineShoppingCart
                  size={25}
                  color="black"
                  style={{ marginTop: "3px" }}
                />
                {/* <CartCountBadge size="w-[25px] h-[25px]" /> */}
              </div>
              <div className="hidden md:block gap-8">
                <ul className="flex items-center">
                  <li className="relative group">
                    <p
                      className=" hover:text-gray-500 px-3 py-2 select-none"
                      onClick={toggleFullNameDropdown}
                    >
                      Full Name
                    </p>
                    {/* Submenu for Full Name */}
                    {isFullNameOpen && (
                      <ul className="absolute rounded bg-white shadow-md py-2 md:px-4 px-20">
                        <li>
                          <a className="hover:text-gray-500" href="">
                            Profile
                          </a>
                        </li>
                        <li>
                          <a className="hover:text-gray-500" href="">
                            Log out
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="relative group">
                    <p
                      className=" hover:text-gray-500 px-3 py-2 select-none"
                      onClick={toggleAdminDropdown}
                    >
                      Admin
                    </p>
                    {isAdminOpen && (
                      <ul className="absolute rounded bg-white shadow-md py-2 md:px-4 px-20">
                        <li>
                          <a className="hover:text-gray-500" href="">
                            Users
                          </a>
                        </li>
                        <li>
                          <a className="hover:text-gray-500" href="">
                            Dashboard
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>

              <div>
                <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-500">
                  <Link to={"/login"}>Sign in</Link>
                </button>
              </div>

              <div className="md:hidden">
                <button
                  onClick={toggleNavbar}
                  className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-green-500 focus:outline-none focus:bg-green-600 focus:text-white"
                >
                  <svg
                    className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className=" hover:text-gray-300 block px-3 py-2">
              Home
            </a>
            <a href="#" className=" hover:text-gray-300 block px-3 py-2">
              About
            </a>
            <a href="#" className=" hover:text-gray-300 block px-3 py-2">
              Advice
            </a>
            <a href="#" className=" hover:text-gray-300 block px-3 py-2">
              Blogs
            </a>
            <a href="#" className=" hover:text-gray-300 block px-3 py-2">
              Contacts
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
