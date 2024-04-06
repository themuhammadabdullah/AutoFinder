//imports
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./HomeWidgetModal";

//material-ui
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

//hooks
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//store
import { SignUp, login } from "../../store/authenticationSlice";
import { Deactivate } from "../../store/navbarSlice";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

//google login
// import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const HomeWidgetModal = ({ isOpen, closeModal }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [registrationError, setRegistrationError] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const ClientId =
    "857582053843-uhnd2vrnefg570aim0e4h754kcgdims8.apps.googleusercontent.com";

  const overlayClassName = "custom-overlay";

  const customModalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      width: "80%",
      maxWidth: "500px",
      maxHeight: "90%",
      margin: "auto",
      padding: "20px",
      borderRadius: "15px",
    },
  };

  if (window.matchMedia("(max-width: 576px)").matches) {
    customModalStyle.content.width = "90%";
  }
  if (window.matchMedia("(min-width: 577px) and (max-width: 768px)").matches) {
    customModalStyle.content.width = "80%";
  }
  if (window.matchMedia("(min-width: 769px) and (max-width: 992px)").matches) {
    customModalStyle.content.width = "70%";
  }
  if (window.matchMedia("(min-width: 993px)").matches) {
    customModalStyle.content.width = "60%";
  }
  const toggleLoginForm = () => {
    setRegistrationError("");
    setShowLoginForm(!showLoginForm);
  };
  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  }
  const loginHandler = async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!isValidEmail(email)) {
      return toast.error("Invalid Email");
    } else {
      if (password === "") {
        return toast.error("Invalid password");
      }
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8080/auth/logIn",
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

      setRegistrationError("");

      const jwtToken = response.data.token;
      const user = response.data.user;

      dispatch(login({ user, token: jwtToken }));
      dispatch(Deactivate());

      document.cookie = `jwtToken=${jwtToken}; path=/; max-age=3600`;

      setTimeout(() => {
        setIsLoading(false);
        closeModal();
      }, 2000);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.error === "Email not found") {
            toast.error("Email not found");
          } else if (error.response.data.error === "Invalid password") {
            toast.error("Invalid password");
          } else if (error.response.data.error === "User is banned") {
            toast.error("You are banned ❌");
          }
        } else if (error.response.status === 500) {
          setRegistrationError("An error occurred during login.");
        } else {
          setRegistrationError("An unexpected error occurred.");
        }
      } else {
        setRegistrationError("An unexpected error occurred.");
      }

      setIsLoading(false);
    }
  };
  const handleRegistration = async (e) => {
    e.preventDefault();

    if (name.length <= 2) {
      return toast.error("Invalid Name");
    }
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain at least 1 capital character");
    }

    if (!/[@$!%*#?&]/.test(password)) {
      return toast.error("Password must contain at least 1 special character");
    }

    if (confirmPassword !== password) {
      return toast.error("Password Not matched");
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/sign-up",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRegistrationError("");

      if (response.status === 200) {
        setIsLoading(false);
        navigate("/verify");
      } else {
        setIsLoading(false);
        console.error("Verification failed with status code:", response.status);
        setRegistrationError(response.status.error);
        toast.error(response.status.error);
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (
        error.response &&
        error.response.data.error === "Email already taken"
      ) {
        console.log("email taken");
        toast.error("Email already taken");
      } else if (
        error.response &&
        error.response.data.error ===
          "Password must be at least 8 characters long and contain at least one capital letter and one special character."
      ) {
        console.log("invalid password");
        setRegistrationError(
          "Password must be at least 8 characters long and contain at least one capital letter and one special character."
        );
        toast.error(
          "Password must be at least 8 characters long and contain at least one capital letter and one special character."
        );
      } else {
        setRegistrationError("An error occurred during registration.");
      }
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setRegistrationError("");
    closeModal();
  };
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const onSuccess = async (res) => {
    const { googleId, imageUrl, email, name, givenName, familyName } =
      res.profileObj;

    setUserName(name);
    setUserEmail(email);

    if (!isValidEmail(email)) {
      return toast.error("Invalid Email");
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/saveGoogleUser",
        {
          userName: name,
          userEmail: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setRegistrationError("");

        const jwtToken = response.data.token;
        const user = response.data.user;

        dispatch(login({ user, token: jwtToken }));
        dispatch(Deactivate());

        document.cookie = `jwtToken=${jwtToken}; path=/; max-age=3600`;
        closeModal();
      } else if (
        response.status === 401 &&
        response.data.error === "User is banned"
      ) {
        const errorMessage = response.data.message;
        setRegistrationError(errorMessage);
      } else {
        setRegistrationError("Sign in error 2");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setRegistrationError("Sign in error");
    }
  };

  const onFailure = (res) => {
    console.log("user sign in failed", res);
    setRegistrationError("Sign in error ");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: ClientId,
        scope: "",
        prompt: "select_account",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      contentLabel="Example Modal"
      style={customModalStyle}
    >
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-md-12">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <CircularProgress color="primary" />
              </div>
            ) : showLoginForm ? (
              <>
                <form onSubmit={loginHandler}>
                  <h2 className="text-center font-weight-bold">Login</h2>
                  <div className="form-group">
                    <label htmlFor="loginEmail">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      placeholder="username@email.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Log In
                  </button>
                  <div className="mt-3 text-center">
                    <div id="signInButton">
                      {/* <GoogleLogin
                        clientId={ClientId}
                        buttonText="Login With Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={true}
                      ></GoogleLogin> */}
                    </div>
                  </div>

                  {registrationError && (
                    <div className="alert alert-danger mt-3">
                      {registrationError}
                    </div>
                  )}
                  <div className="mt-3 text-center">
                    <button className="btn btn-link" onClick={toggleLoginForm}>
                      Don't have an account? Sign Up
                    </button>
                  </div>
                  <div className="mt-3 text-center">
                    <a
                      href="/forget-password"
                      style={{
                        textDecoration: "none",
                        color: "#007BFF",
                        fontWeight: "bold",
                        fontSize: "0.8em",
                        padding: "10px 20px",
                        border: "1px solid #007BFF",
                        borderRadius: "5px",
                        backgroundColor: "#FFFFFF",
                        transition: "background-color 0.3s, color 0.3s",
                        position: "absolute",
                        bottom: "-22vh",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      Forgot Password
                    </a>
                  </div>
                </form>
              </>
            ) : (
              !showLoginForm &&
              (isLoading ? (
                <div>
                  <CircularProgress></CircularProgress>
                </div>
              ) : (
                <form onSubmit={handleRegistration}>
                  <h2 className="text-center text-primary font-weight-bold">
                    Sign Up
                  </h2>
                  <ToastContainer />

                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your full name here"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signupEmail">Email Address</label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      id="signupEmail"
                      placeholder="username@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNumber">phone Number</label>
                    <input
                      required
                      type="phonenumber"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      required
                      type="address"
                      className="form-control"
                      id="address"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Enter your password again"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                  {registrationError && (
                    <div className="alert alert-danger mt-3">
                      {registrationError}
                    </div>
                  )}
                  <div className="mt-3 text-center">
                    <button
                      className="btn btn-link"
                      onClick={console.log("")}
                    >
                      Already have an account? Log In
                    </button>
                  </div>
                </form>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HomeWidgetModal;
