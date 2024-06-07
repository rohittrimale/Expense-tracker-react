import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0",
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      throw new Error(error?.response?.data?.error?.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0",
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      throw new Error(error?.response?.data?.error?.message || "Signup failed");
    }
  };

  const updateUserProfile = async (fullName, profilePhotoUrl) => {
    try {
      const idToken = user.idToken;
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0`,
        {
          idToken: idToken,
          displayName: fullName,
          photoUrl: profilePhotoUrl,
          returnSecureToken: true,
        }
      );
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      throw new Error("Failed to update profile");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, login, logout, signup, updateUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};
