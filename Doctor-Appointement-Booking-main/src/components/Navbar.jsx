import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken,userData } = useContext(AppContext);
  // const [token, setToken] = useState(true);


  const logout=()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <li>
          <NavLink
            to="/"
            className=" py-1 hover:text-blue-500 font-medium text-lg"
          >
            Home
          </NavLink>
        </li>
        <hr className="border:none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        <li>
          <NavLink
            to="/doctors"
            className=" py-1 hover:text-blue-500 font-medium text-lg"
          >
            All Doctors
          </NavLink>
        </li>
        <hr className="border:none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />

        <li>
          <NavLink
            to="/about"
            className=" py-1 hover:text-blue-500 font-medium text-lg"
          >
            About
          </NavLink>
        </li>
        <hr className="border:none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />

        <li>
          <NavLink
            to="/contact"
            className=" py-1 hover:text-blue-500 font-medium text-lg"
          >
            Contact
          </NavLink>
        </li>
        <hr className="border:none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                {/* yaha se code remaining */}
                <p
                  onClick={() => navigate("myprofile")}
                  className="hover:text-black cursor:pointer"
                >
                  Profile
                </p>
                <p
                  onClick={() => navigate("myappointment")}
                  className="hover:text-black cursor:pointer"
                >
                  My Appointement
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor:pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/Login")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
        />
        {/* mobile menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink
              // className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/"
            >
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink
              // className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/doctors"
            >
              <p className="px-4 py-2 rounded inline-block">All Doctors</p>
            </NavLink>
            <NavLink
              // className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/about"
            >
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>
            <NavLink
              // className="px-4 py-2 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/contact"
            >
              <p className="px-4 py-2 rounded inline-block">Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
