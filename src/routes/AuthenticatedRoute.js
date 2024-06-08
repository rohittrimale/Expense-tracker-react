// components/AuthenticatedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const AuthenticatedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthenticatedRoute;
