//imports
import React, { useEffect } from "react";
//material-ui
import { Alert, Avatar, Card, CircularProgress } from "@mui/material";

//hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//store
import { AdminLoggedIn } from "../../store/adminSlice";

//axios
import axios from "axios";

//toastify
import { ToastContainer, toast } from "react-toastify";

const cardStyles = {
  width: "100%",
  padding: "50px",
  textAlign: "center",
  background: "linear-gradient( #000,#01336F)",
};

const stepContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
};

const stepStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  useEffect(() => {
    if (adminLoggedIn) {
      console.log("admin logged in", adminLoggedIn);
      toast.success("Welcome Back Admin!");
      navigate("/admin/home");
    }
  }, [adminLoggedIn]);
  const loginHandler = async (e) => {
    e.preventDefault();
    if (email !== "admin@pakwheels.com") {
      return setShowError(true);
    }
    if (password !== "admin") {
      return setShowError(true);
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/logIn",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Welcome Back Admin!");
        const token = response.data.token;

        localStorage.setItem("jwtToken", token);

        localStorage.setItem("AdminLoggedIn", "true");

        dispatch(AdminLoggedIn({ token: token }));

        navigate("/admin/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const centerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  return (
    <>
      {isLoading ? (
        <div style={centerStyle}>
          <CircularProgress />
        </div>
      ) : (
        <Card style={cardStyles}>
          <h2 style={{ color: "#FFFFFF", fontWeight: "bold" }}>Pakwheels</h2>
          <p style={{ color: "#FFFFFF" }}>Admin Login</p>
          <div style={stepContainerStyles}>
            <div style={stepStyles}>
              <Avatar
                style={{ width: "100px", height: "100px" }}
                alt="Logo"
                src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1406364553/kmsoahr21m6zogtykmsz.png"
              />
            </div>
          </div>
        </Card>
      )}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 p-4">
            <form onSubmit={loginHandler}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  placeholder="username@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <ToastContainer />

              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  placeholder="Enter your password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="log"
                style={{
                  color: "white",
                  backgroundColor: "rgba(0, 19, 111, 1)",
                  border: "1px solid rgba(0, 19, 111, 1)",
                  cursor: "pointer",
                  borderRadius: "4px",
                  fontWeight: "600",
                  margin: "20px 0",
                  width: "200px",
                  padding: "10px 0",
                  boxShadow: "0 0 20px rgba(0, 19, 111, 0.2)",
                  transition: "0.4s",
                }}
              >
                Login
              </button>
              {showError && <Alert severity="error">Invalid Credentials</Alert>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
