// useAuth.js

//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//store
import { login } from "../store/authenticationSlice";

//axios
import axios from "axios";

const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

const decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};
const useAuth = () => {
  const [userObject, setUser] = useState(null);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = getCookie("jwtToken");

    if (jwtToken) {
      const decodedToken = decodeToken(jwtToken);
      const userObject = decodedToken.user;

      if (userObject && userObject._id) {
        const userId = userObject._id;

        const fetchUserData = async () => {
          try {
            const response = await axios.post(
              "http://localhost:8080/auth/getUser",
              {
                userId,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const userData = response.data;

            if (response.status === 200) {
              dispatch(login({ user: userData, token: jwtToken }));
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };

        fetchUserData();
      } else {
        console.log("Invalid userObject or _id");
      }
    } else {
      console.log("Invalid Cookie");
    }
  }, [dispatch]);

  return user;
};

export default useAuth;
