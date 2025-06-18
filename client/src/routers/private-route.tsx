import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import logoutUser, { isTokenExpired } from "../utils/logout";
import useCustomToast from "../components/toast/useCustomToast";
import { path } from "../components/constant";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const toast = useCustomToast()
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const endDate = useSelector((state: RootState) => state.auth.endDate);
  const isExpired = isTokenExpired(endDate);
  const location = useLocation();

  useEffect(() => {
    if (token && isExpired) {
      logoutUser(dispatch, navigate);
      toast.warning("Session expired. Please log in again.");
    }
  }, [isExpired, dispatch, navigate]);

  if (!token || isExpired) {
    return <Navigate to={path.LOGIN_PAGE} state={{ from: location }} replace />;
  }
  

  return <Outlet />;
};

export default PrivateRoute;
