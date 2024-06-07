import React from "react";

const Navbar = () => {
  return (
    <div className="w-full pt-2 px-5">
      <div className="flex text-lg gap-4 items-center">
        <img
          src="https://play-lh.googleusercontent.com/_IA1p-kzpnDyoutaCf9gxWME1fc76UpoLhtvm-5K3Aainu-U0ClZYS8ug-4stKjZu_s"
          alt="logo"
          className="h-12"
        />
        <div className="hover:scale-105 duration-200 cursor-pointer">Home</div>
        <div className="hover:scale-105 duration-200 cursor-pointer">
          Product
        </div>
        <div className="hover:scale-105 duration-200 cursor-pointer">
          About us
        </div>
      </div>
    </div>
  );
};

export default Navbar;
