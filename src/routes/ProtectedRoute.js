// components/ProtectedRoute.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, checkEmailVerificationStatus } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(user);
      if (!user.emailVerified) {
        navigate("/verifyemail");
      }
      if (user.registered) {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
