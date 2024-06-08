// components/ProtectedRoute.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, checkEmailVerificationStatus } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(user);
      if (!user.emailVerified) {
        navigate("/verifyemail");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
