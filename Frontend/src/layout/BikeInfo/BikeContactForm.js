//React Imports
import React, { useState } from "react";

//React-router
import { useNavigate } from "react-router-dom";

//Material-UI
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
//Toast
import { ToastContainer, toast } from "react-toastify";

//Axios
import axios from "axios";

function BikeContactForm({ bikeCreated, bike }) {
  // State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);

  //navigate
  const navigate = useNavigate();

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    const regex = /^03\d{9}$/;
    setIsValidPhoneNumber(regex.test(value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!bikeCreated) {
      toast.error("Please submit the bike info form first.");

      return;
    }
    if (isValidPhoneNumber) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/ad/seller-contact-bike",
          {
            phoneNumber: phoneNumber,
            bike: bike,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setIsSubmissionSuccess(true);
          toast.success("Step 3 Completed");
        }
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Error uploading Contact. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Invalid phone number");
    }
  };
  const navigateToMyAds = (e) => {
    e.preventDefault();
    navigate("/my-ads");
  };

  return (
    <div className="container my-5">
      <div
        className="biked p-4"
        style={{
          width: "100%",
          border: "2px solid lightgrey",
          height: "100%",
          borderStyle: "outset",
        }}
      >
        <div className="biked-content">
          <h2 style={{ color: "#333333" }}>Step 3: Contact Information</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5 mt-5">
              <TextField
                id="phoneNumber"
                label="Enter Mobile Number"
                variant="outlined"
                fullWidth
                required
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                error={!isValidPhoneNumber}
                helperText={
                  isValidPhoneNumber
                    ? "Enter a genuine 11 digit mobile no. with format 03XXXXXXXXX."
                    : "Invalid phone number format. Please use the format 03XXXXXXXXX."
                }
                inputProps={{
                  pattern: "03[0-9]{9}",
                }}
              />
            </div>

            <div className="text-center">
              {isLoading ? (
                <div>
                  <CircularProgress />
                  <p>Submitting...</p>
                </div>
              ) : isSubmissionSuccess ? (
                <DoneIcon fontSize="large" style={{ color: "green" }} />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={!isValidPhoneNumber}
                  style={{ outline: "none", border: "none" }}
                >
                  Submit & Continue
                </Button>
              )}
            </div>
          </form>
          {isSubmissionSuccess && (
            <div>
              <Alert severity="success">
                Your Ad is currently under review. It will be live shortly
              </Alert>
              <Button
                style={{ outline: "none", border: "none" }}
                onClick={navigateToMyAds}
              >
                See My Ads
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BikeContactForm;
