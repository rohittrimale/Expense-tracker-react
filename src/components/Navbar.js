import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user, updateUserProfile } = useContext(UserContext);
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    calculateProfileCompletion();
  }, [user]);

  const calculateProfileCompletion = () => {
    if (user) {
      let completion = 60;
      if (user.displayName) completion += 20; // Example: displayName contributes 50%
      if (user.photoUrl) completion += 20; // Example: photoUrl contributes 50%
      setProfileCompletion(completion);
    }
  };
  return (
    <div className="flex justify-between w-full pt-2 px-5">
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
      {!(user && profileCompletion === 100) && (
        <div className="w-[40%]  px-2">
          Your Profile is{" "}
          <span className="font-semibold">{profileCompletion}%</span> Completed.
          A Complete profile has higher chances of landing a job.
          <Link to="/profileUpdate" className="text-blue-500">
            Complete Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
