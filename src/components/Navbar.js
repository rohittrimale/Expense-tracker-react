import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user, updateUserProfile, logout } = useContext(UserContext);
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    calculateProfileCompletion();
  }, [user]);

  const calculateProfileCompletion = () => {
    if (user) {
      let completion = 60;
      if (user.displayName) completion += 20;
      if (user.photoUrl) completion += 20;
      setProfileCompletion(completion);
    }
  };

  const logoutHandler = () => {
    logout();
  };
  return (
    <div className="flex justify-between w-full pt-2 px-5">
      <div className="flex text-lg gap-4 items-center">
        <NavLink to="/">
          <img
            src="https://play-lh.googleusercontent.com/_IA1p-kzpnDyoutaCf9gxWME1fc76UpoLhtvm-5K3Aainu-U0ClZYS8ug-4stKjZu_s"
            alt="logo"
            className="h-12"
          />
        </NavLink>
        <NavLink to="/" className="hover:scale-105 duration-200 cursor-pointer">
          Home
        </NavLink>
        <NavLink
          to="/product"
          className="hover:scale-105 duration-200 cursor-pointer"
        >
          Product
        </NavLink>
        <NavLink
          to="about"
          className="hover:scale-105 duration-200 cursor-pointer"
        >
          About us
        </NavLink>
      </div>
      {!(user === null || profileCompletion === 100) && (
        <div className="w-[40%]  px-2">
          Your Profile is{" "}
          <span className="font-semibold">{profileCompletion}%</span> Completed.
          A Complete profile has higher chances of landing a job.
          <NavLink to="/profileUpdate" className="text-blue-500">
            Complete Now
          </NavLink>
        </div>
      )}
      {user && (
        <div>
          <button
            onClick={logoutHandler}
            type="button"
            class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
