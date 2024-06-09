import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../store/premiumSlice";

const DarkmodeButton = () => {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const isDarkMode = useSelector((state) => state.premium.isDarkMode);
  const dispatch = useDispatch();
  const handleSwitch = () => {
    dispatch(changeMode());
  };

  return (
    <div className="-mt-2">
      <input
        type="checkbox"
        name="light-switch"
        className="light-switch sr-only"
        id="light-switch"
        checked={isDarkMode}
        onClick={handleSwitch}
      />
      <label className="relative cursor-pointer " htmlFor="light-switch">
        {!isDarkMode ? (
          <svg
            className="dark:hidden"
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-slate-300"
              d="M14 0h4v4h-4zM25.76 3.274l2.828 2.83-2.83 2.826-2.826-2.828zM28 14h4v4h-4zM25.9 28.866l-2.828-2.826 2.826-2.83 2.83 2.828zM14 28h4v4h-4zM5.96 28.728l-2.826-2.83 2.828-2.828 2.828 2.83zM0 14h4v4H0zM6.1 3.412l2.826 2.828-2.828 2.83L3.272 6.24z"
            />
            <path
              className="fill-slate-400"
              d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Z"
            />
          </svg>
        ) : (
          <svg
            className="dark:block"
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-slate-400"
              d="M12.4 2C6.4 3.6 2 9.2 2 15.8 2 23.6 8.4 30 16.2 30c6.6 0 12-4.4 13.8-10.4C19.4 22.4 9.6 12.6 12.4 2Z"
            />
            <path
              className="fill-slate-500"
              d="M25 10a1.25 1.25 0 0 1-1.25-1.25 2.504 2.504 0 0 0-2.5-2.5 1.25 1.25 0 1 1 0-2.5 2.504 2.504 0 0 0 2.5-2.5 1.25 1.25 0 1 1 2.5 0c.001 1.38 1.12 2.499 2.5 2.5a1.25 1.25 0 1 1 0 2.5c-1.38.001-2.499 1.12-2.5 2.5A1.25 1.25 0 0 1 25 10Z"
            />
          </svg>
        )}
      </label>
    </div>
  );
};

export default DarkmodeButton;
