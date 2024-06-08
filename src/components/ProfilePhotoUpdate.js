import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaFirefoxBrowser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const ProfilePhotoUpdate = () => {
  const navigate = useNavigate();
  const fullNameRef = useRef();
  const profilePhotoUrlRef = useRef();
  const [error, setError] = useState("");
  const { updateUserProfile, user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fullNameRef.current.value = user.displayName || "";
      profilePhotoUrlRef.current.value = user.photoUrl || "";
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredFullNameRef = fullNameRef.current.value;
    const enteredProfilePhotoUrlRef = profilePhotoUrlRef.current.value;

    try {
      await updateUserProfile(enteredFullNameRef, enteredProfilePhotoUrlRef);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 justify-center items-center mt-8"
    >
      <h1 className="mb-2 text-2xl font-bold">Contact Deatils</h1>
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <IoMdPerson size={32} /> <span className=" text-lg">Full Name :</span>
        </div>
        <input
          type="text"
          name="text"
          id="fullName"
          className="bg-gray-50 w-half border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Full Name"
          ref={fullNameRef}
          required
        />
      </div>
      <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <FaFirefoxBrowser size={32} />
          <span className=" text-lg">Profile Photo Url :</span>
        </div>
        <input
          type="text"
          name="text"
          className="bg-gray-50 w-half border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ref={profilePhotoUrlRef}
          required
        />
      </div>
      <div className="flex gap-4 mt-5">
        <button
          type="submit"
          className="w-half text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Update
        </button>
        <Link
          to="/"
          className="w-half text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default ProfilePhotoUpdate;
