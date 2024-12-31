import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { Context } from "../context/Context";

const PrivateRoute = ({ children, ...rest }) => {
  const { token } = useContext(Context);
  return !token ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
