import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartCountBadge from "./CartCountBadge";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import toast from "react-hot-toast";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  // Responsiveness:

  const [isOpen, setIsOpen] = useState(false);
  const [isFullNameOpen, setIsFullNameOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleFullNameDropdown = () => {
    setIsFullNameOpen(!isFullNameOpen);
  };

  const toggleAdminDropdown = () => {
    setIsAdminOpen(!isAdminOpen);
  };

  const subMenuRef = useRef(null);

  // Close submenus when clicked outside them
  useEffect(() => {
    const handleClickOutsideSubMenu = (event) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setIsFullNameOpen(false);
        setIsAdminOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutsideSubMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideSubMenu);
    };
  }, []);

  // For mobile menu bar
  const [isFullNameOpenMob, setIsFullNameOpenMob] = useState(false);
  const [isAdminOpenMob, setIsAdminOpenMob] = useState(false);

  const toggleFullNameDropdownMob = () => {
    console.log("click full name");
    setIsFullNameOpenMob(!isFullNameOpenMob);
  };

  const toggleAdminDropdownMob = () => {
    setIsAdminOpenMob(!isAdminOpenMob);
  };

  const subMenuRefMob = useRef(null);

  useEffect(() => {
    const handleClickOutsideSubMenuMob = (event) => {
      if (
        subMenuRefMob.current &&
        !subMenuRefMob.current.contains(event.target)
      ) {
        setIsFullNameOpenMob(false);
        setIsAdminOpenMob(false);
      }
    };

    document.addEventListener("click", handleClickOutsideSubMenuMob);

    return () => {
      document.removeEventListener("click", handleClickOutsideSubMenuMob);
    };
  }, []);

  return (
    <div className="border-b border-gray-300">
      <nav className="bg-white md:container">
        <div className="w-[98%] mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center">
                <span className="text-green-700 font-medium text-3xl text-decoration-none">
                  <Link to={"/"}>
                    <div className="w-[60px]">
                      <img
                        src="/logo.png"
                        alt="Krishipal"
                        className="w-full ml-3 md:ml-0"
                      />
                    </div>
                  </Link>
                </span>
              </div>
            </div>

            <div className="md:flex hidden md:ml-28">
              <div className="ml-auto flex items-center lg:gap-6">
                <Link to="/">
                  <p className="hover:text-gray-500 px-3 py-2">Home</p>
                </Link>
                <Link to="/about">
                  <p className="hover:text-gray-500 px-3 py-2">About</p>
                </Link>
                <Link to="/blogs">
                  <p className="hover:text-gray-500 px-3 py-2">Blogs</p>
                </Link>
                <Link to="/contact">
                  <p className="hover:text-gray-500 px-3 py-2">Contact</p>
                </Link>
                <Link to="/shop">
                  <p className="hover:text-gray-500 px-3 py-2">Shop</p>
                </Link>
                <Link to="/shop/products">
                  <p className="hover:text-gray-500 px-3 py-2">Search</p>
                </Link>
              </div>
            </div>

            <div className="flex gap-8 items-center">
              <div className="relative cursor-pointer" onClick={toggleCart}>
                <AiOutlineShoppingCart
                  size={25}
                  color="black"
                  style={{ marginTop: "3px" }}
                />
                {cartItems.length > 0 && (
                  <CartCountBadge
                    size="w-[25px] h-[25px]"
                    cartItems={cartItems}
                  />
                )}
              </div>
              {isCartOpen && <Cart setShowCart={setIsCartOpen} />}

              {userInfo ? (
                <div className="hidden md:block gap-8" ref={subMenuRef}>
                  <ul className="flex items-center">
                    <li className="relative group">
                      <p
                        className="hover:text-gray-500 px-3 py-2 select-none cursor-pointer"
                        onClick={toggleFullNameDropdown}
                      >
                        {userInfo.name}
                      </p>

                      {/* Submenu for Full Name */}
                      {isFullNameOpen && (
                        <ul className="absolute rounded bg-white shadow-md py-2 md:px-4 px-20 z-50">
                          <li className="my-1">
                            <Link
                              to={"/profile"}
                              onClick={() => setIsFullNameOpen(false)}
                            >
                              <p className="hover:text-gray-500">Profile</p>
                            </Link>
                          </li>
                          <li>
                            <a
                              className="hover:text-gray-500 select-none cursor-pointer"
                              onClick={() => {
                                logoutHandler();
                                setIsFullNameOpen(false);
                              }}
                            >
                              <span>Log out</span>
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>

                    {userInfo && userInfo.isAdmin && (
                      <li className="relative group">
                        <p
                          className="hover:text-gray-500 px-3 py-2 select-none cursor-pointer"
                          onClick={toggleAdminDropdown}
                        >
                          Admin
                        </p>

                        {/* Submenu for Admin */}
                        {isAdminOpen && (
                          <ul className="absolute rounded bg-white shadow-md py-2 md:px-4 px-20 z-50">
                            <li>
                              <Link
                                to={"/admin/dashboard"}
                                onClick={() => setIsAdminOpen(false)}
                              >
                                Dashboard
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              ) : (
                <Link to={"/login"}>
                  <button className="lg:bg-green-600 lg:hover:text-white lg:text-white lg:px-5 lg:py-2 lg:rounded lg:hover:bg-green-500 lg:text-[16px] text-[16px] text-green-600 hover:text-green-500 md:bg-green-600 md:hover:text-white md:text-white md:px-5 md:py-2 md:rounded md:hover:bg-green-500 md:text-[16px">
                    Sign in
                  </button>
                </Link>
              )}

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

        {/* Mobile Nav Bar Section*/}

        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to={"/"}>
              <p
                className="hover:text-gray-300 block px-3 py-2 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Home
              </p>
            </Link>

            <Link to={"/about"}>
              <p
                className="hover:text-gray-300 block px-3 py-2 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                About
              </p>
            </Link>

            <Link to="/blogs">
              <p
                className="hover:text-gray-300 block px-3 py-2 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </p>
            </Link>

            <Link to="/contact">
              <p
                className="hover:text-gray-300 block px-3 py-2 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Contacts
              </p>
            </Link>

            <Link to="/shop">
              <p
                className="hover:text-gray-300 block px-3 py-2 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </p>
            </Link>

            <Link to="/shop/products">
              <p
                className="hover:text-gray-300 block px-3 py-2 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Search
              </p>
            </Link>

            <div ref={subMenuRefMob}>
              {userInfo && (
                <div>
                  <p
                    className="hover:text-gray-300 block px-3 py-2 cursor-pointer"
                    onClick={toggleFullNameDropdownMob}
                  >
                    {userInfo.name}
                  </p>

                  {/* Submenu for Full Name */}
                  {isFullNameOpenMob && (
                    <ul className="rounded bg-white shadow-md py-2 px-3 mt-1 w-36">
                      <li>
                        <Link
                          to={"/profile"}
                          onClick={() => {
                            setIsFullNameOpenMob(false);
                          }}
                        >
                          <p
                            className="hover:text-gray-500 block px-3 py-2 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                          >
                            Profile
                          </p>
                        </Link>
                      </li>
                      <li>
                        <p
                          className="hover:text-gray-500 block px-3 py-2 cursor-pointer"
                          onClick={() => {
                            logoutHandler();
                            setIsFullNameOpenMob(false);
                            setIsOpen(false);
                          }}
                        >
                          Logout
                        </p>
                      </li>
                    </ul>
                  )}
                </div>
              )}

              {userInfo && userInfo.isAdmin && (
                <div>
                  <p
                    className="hover:text-gray-300 block px-3 py-2 cursor-pointer"
                    onClick={toggleAdminDropdownMob}
                  >
                    Admin
                  </p>

                  {/* Submenu for Admin */}
                  {isAdminOpenMob && (
                    <ul className="rounded bg-white shadow-md py-2 px-3 mt-1 w-36">
                      <li>
                        <Link
                          to={"/admin/dashboard"}
                          onClick={() => {
                            setIsAdminOpenMob(false);
                            setIsOpen(false);
                          }}
                        >
                          <p className="hover:text-gray-500 block px-3 py-2 cursor-pointer">
                            Dashboard
                          </p>
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
