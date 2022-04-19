import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { fetchNewAccessJWT } from "../../api/userApi";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { loginSuccess } from "../../components/login/loginSlice";
import { getuserProfile } from "../../pages/Dashboard/userActions";

export const PrivateRoute = () => {
  const dispatch = useDispatch();
  let { isAuth } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const updateAccessJWT = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(loginSuccess());
    };

    !user._id && dispatch(getuserProfile());

    !sessionStorage.getItem("accessJWT") &&
      localStorage.getItem("crmSite") &&
      updateAccessJWT();

    !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
  }, [dispatch, isAuth, user._id]);
  isAuth = useSelector((state) => state.login);
  return isAuth ? (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ) : (
    <Navigate to="/" />
  );
};
