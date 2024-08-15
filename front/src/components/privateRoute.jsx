import { useAuth } from "../hooks";
import {Navigate} from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user)
  return user ? children : <Navigate to="/login" />;
};
