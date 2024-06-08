// components/UnauthenticatedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const UnauthenticatedRoute = ({ children }) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default UnauthenticatedRoute;
