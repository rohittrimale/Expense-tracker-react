import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import DarkmodeButton from "./DarkmodeButton";
import {
  changeMode,
  deactivatePremium,
  lightMode,
  premiumHandler,
} from "../store/premiumSlice";

const Navbar = () => {
  const { user, updateUserProfile, logout, loading } = useContext(UserContext);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const { isPremium, isDarkMode } = useSelector((state) => state.premium);
  const dispatch = useDispatch();

  const premiumModeHandler = () => {
    dispatch(premiumHandler());
    dispatch(changeMode());
  };

  const deactivatePremiumHandler = () => {
    dispatch(deactivatePremium());
    dispatch(lightMode());
  };
  const isEligibleForPremium = useSelector(
    (state) => state.expenses.isEligibleForPremium
  );
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
    <div>
      <div className="flex justify-between w-full pt-2 px-5">
        <div className="flex text-lg gap-4 items-center">
          <NavLink to="/">
            <img
              src="https://play-lh.googleusercontent.com/_IA1p-kzpnDyoutaCf9gxWME1fc76UpoLhtvm-5K3Aainu-U0ClZYS8ug-4stKjZu_s"
              alt="logo"
              className="h-12"
            />
          </NavLink>
          <NavLink
            to="/"
            className="hover:scale-105 duration-200 cursor-pointer"
          >
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
            <span className="font-semibold">{profileCompletion}%</span>{" "}
            Completed. A Complete profile has higher chances of landing a job.
            <NavLink to="/profileUpdate" className="text-blue-500">
              Complete Now
            </NavLink>
          </div>
        )}
        <div className="flex items-center gap-2 justify-end">
          {isEligibleForPremium && (
            <div>
              <button
                onClick={
                  !isPremium ? premiumModeHandler : deactivatePremiumHandler
                }
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  {!isPremium ? "Activate Premium" : "Deactivate Premium"}
                </span>
              </button>
            </div>
          )}
          {user && (
            <div>
              <button
                onClick={logoutHandler}
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Logout
              </button>
            </div>
          )}
          {isPremium && <DarkmodeButton />}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Navbar;
