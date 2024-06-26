import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isVerifyUser, setIsVerifyUser] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const idToken = localStorage.getItem("idToken");

    if (storedUser && idToken) {
      setUser(storedUser);
      setToken(idToken);
      fetchUserData(idToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (idToken) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0",
        { idToken }
      );
      const userData = response.data.users[0];
      setUser(userData);
      setIsVerifyUser(userData.emailVerified);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0",
        { email, password, returnSecureToken: true }
      );
      // console.log(response);
      const { idToken, localId } = response.data;
      const userData = { email, localId, idToken };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("idToken", idToken);

      setUser(userData);
      fetchUserData(idToken);
      navigate("/");
    } catch (error) {
      throw new Error(error.response.data.error.message || "Login error");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("idToken");
    setUser(null);
    navigate("/login");
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0",
        { email, password, returnSecureToken: true }
      );
      const { idToken, localId } = response.data;
      const userData = { email, localId, idToken };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("idToken", idToken);

      setUser(userData);
      navigate("/verifyemail");
    } catch (error) {
      throw new Error(error.response.data.error.message || "Login error");
    }
  };
  const sendEmailVerification = async (idToken) => {
    try {
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC0fisuDptkQLsA5PXa2PX3_0y5cwm4hK0",
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );
    } catch (error) {
      throw new Error(error.response.data.error.message || "Verify error");
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loading,
        sendEmailVerification,
        isVerifyUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
