//imports
import React, { useState, useRef } from "react";
import HomeWidgetModal from "../Homewidget/HomeWidgetModal";

//material-ui
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

//hooks
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//store
import {
  SignUp,
  login,
  userEmailVerified,
  userLoggedIn,
} from "../../store/authenticationSlice";

//axios
import axios from "axios";

function ValidationBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingState, setLoadingstate] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [userVerified, setUserVerified] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [formValues, setFormValues] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  });

  const inputRefs = {
    code1: useRef(null),
    code2: useRef(null),
    code3: useRef(null),
    code4: useRef(null),
    code5: useRef(null),
    code6: useRef(null),
  };

  const handleInputChange = (e, inputName) => {
    const { value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [inputName]: value,
    }));

    // Focus on the next input field if there is one
    const currentIndex = Number(inputName.charAt(inputName.length - 1));
    if (currentIndex < 6) {
      const nextInputName = `code${currentIndex + 1}`;
      inputRefs[nextInputName].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const concatenatedValue = Object.values(formValues).join("");
    console.log("Code Value:", concatenatedValue);
    setLoadingstate(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/verify",
        {
          concatenatedValue: concatenatedValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response);
      setLoadingstate(false);

      if (response.status === 200) {
        console.log("email Verification successful");
        console.log("API Response:", response.data);

        const jwtToken = response.data.jwttoken;
        const user = response.data.user;
        console.log(jwtToken, user);
        setUserVerified(true);

        dispatch(userEmailVerified());
        setShowLoginModal(true);
      } else if (response.status === 400) {
        console.error("Validation error response:", response.data);

        if (response.data && response.data.error) {
          setValidationError(response.data.error);
        } else {
          setValidationError("Invalid Code");
        }

        console.error("Verification failed with status code:", response.status);
      }
    } catch (error) {
      setLoadingstate(false);
      setValidationError("Invalid Code");
      console.error("verification error:", error);
    }
  };

  return (
    <div className="m-5 d-flex justify-content-center align-items-center vh-100">
      {loadingState ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : showLoginModal ? (
        <HomeWidgetModal
          isOpen={showLoginModal}
          closeModal={() => setShowLoginModal(false)}
        />
      ) : (
        <div
          style={{
            width: "20rem",
            border: "1px solid grey",
            padding: "20px 15px",
            borderRadius: "10px",
            boxShadow: "5px 10px 18px #888888",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h4
              className="text-center mb-4"
              style={{ color: "#233D7B", fontWeight: "bold" }}
            >
              Enter your code
            </h4>
            <p className="text-center mb-4">
              Please enter the Code received on your email for verification.
            </p>
            <div className="d-flex mb-3">
              {Array.from({ length: 6 }, (_, i) => (
                <input
                  key={i}
                  type="tel"
                  name={`code${i + 1}`}
                  maxLength="1"
                  pattern="[0-9]"
                  value={formValues[`code${i + 1}`]}
                  onChange={(e) => handleInputChange(e, `code${i + 1}`)}
                  className="form-control"
                  style={{ margin: "0px 5px" }}
                  required
                  ref={inputRefs[`code${i + 1}`]}
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-100 btn btn-primary"
              style={{ background: "#318F3A" }}
            >
              Verify account
            </button>
            {validationError && (
              <div className="alert alert-danger mt-3">{validationError}</div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default ValidationBox;
