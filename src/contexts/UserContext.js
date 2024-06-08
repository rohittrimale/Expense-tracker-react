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
  const [idToken, setIdToken] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (idToken) {
      fetchUserData();
    }
    setLoading(false);
  }, [idToken]);

  const fetchUserData = async () => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0`,
        { idToken: idToken.idToken }
      );
      const userData = response.data.users[0];
      console.log(response);
      setUser({
        email: userData.email,
        displayName: userData.displayName,
        photoUrl: userData.photoUrl,
        emailVerified: userData.emailVerified,
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0`,
        {
          idToken: idToken.idToken,
          displayName: fullName,
          photoUrl: profilePhotoUrl,
          returnSecureToken: true,
        }
      );
      const updatedUser = { ...user, ...response.data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/");
    } catch (error) {
      throw new Error("Failed to update profile");
    }
  };

  const sendEmailVerification = async () => {
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: idToken.idToken,
        }
      );
    } catch (error) {
      console.error("Error sending email verification:", error);
    }
  };

  const checkEmailVerificationStatus = async () => {
    await fetchUserData();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        signup,
        updateUserProfile,
        sendEmailVerification,
        checkEmailVerificationStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
