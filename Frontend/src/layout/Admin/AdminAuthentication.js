//imports
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AdminLoggedIn, AdminLoggedOut } from "../../store/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminAuthentication = () => {
  //dispatch
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      dispatch(AdminLoggedIn({ token: token }));
    } else {
      dispatch(AdminLoggedOut());
    }
  }, [dispatch]);

  return null;
};

export default AdminAuthentication;
