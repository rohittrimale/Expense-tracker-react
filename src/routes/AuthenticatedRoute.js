import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const AuthenticatedRoute = ({ children }) => {
  const { user } = useUser();
  return user && !user.emailVerified ? children : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
