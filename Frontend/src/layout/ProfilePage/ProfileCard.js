//imports
import React from "react";
import "./ProfileCard";

//hooks
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//material-ui
import { Select, MenuItem, InputLabel, Alert } from "@mui/material";
import {
  Modal,
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

//store
import { UpdateUser } from "../../store/authenticationSlice";

//axios
import axios from "axios";

function ProfileCard() {
  const user = useSelector((state) => state.authentication.user);
  const [selectedCity, setSelectedCity] = useState(user.city || "Lahore");
  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(user.gender || "male");
  const [userUpdated, setUserUpdated] = useState(false);
  const [userNotUpdated, setuserNotUpdated] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "20px",
    borderRadius: "4px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
  };

  const profileSaveHandler = async (e) => {
    e.preventDefault();
    const updatedPhoneNumber = phoneNumber;
    const updatedName = name;
    const updatedCity = selectedCity;
    const selectedGenderValue = selectedGender;
    const userId = user._id;

    try {
      const response = await axios.post(
        "http://localhost:8080/profile/update",
        {
          userId,
          updatedPhoneNumber,
          updatedName,
          updatedCity,
          selectedGenderValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        closeModal();
        const updatedUser = response.data.user;
        dispatch(UpdateUser({ user: updatedUser }));
        setUserUpdated(true);
        setTimeout(() => {
          setUserUpdated(false);
        }, 2000);
      } else {
        console.error("Profile Update error: ");
        setuserNotUpdated(true);

        setTimeout(() => {
          setuserNotUpdated(false);
        }, 2000);
        closeModal();
      }
    } catch (error) {
      console.error("Profile Update error: " + error);
      setuserNotUpdated(true);

      setTimeout(() => {
        setuserNotUpdated(false);
      }, 2000);
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modalOpener = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const maleImageUrl =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1695027731~exp=1695028331~hmac=32e012b84c88baf208fb1c6fb2619b728a359e4d2a084f1c4113bf9a7205de5d";
  const femaleImageUrl =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-pink-hair_23-2149436186.jpg?w=740&t=st=1695027996~exp=1695028596~hmac=d5b9060fb47de6b61a5fb27af065de816e91ac0b1e99f236f5af46d1f48a94e2";

  const profileImageUrl =
    user.gender === "female"
      ? femaleImageUrl
      : user.gender === "male"
      ? maleImageUrl
      : selectedGender === "female"
      ? femaleImageUrl
      : maleImageUrl;

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-2 border-right ">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={profileImageUrl}
                alt="Profile"
              />
              <span className="font-weight-bold">{user.name}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-10 border-right">
            <form>
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Mobile Number</label>
                    <input
                      id="phoneNumber"
                      type="text"
                      className="form-control"
                      placeholder="enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <InputLabel id="demo-simple-select-label" className="mt-4">
                      City
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="city"
                      value={selectedCity}
                      label="City"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Lahore"}>Lahore</MenuItem>
                      <MenuItem value={"Karachi"}>Karachi</MenuItem>
                      <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                    </Select>
                  </div>
                  <div className="col-md-12">
                    <FormControl>
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        className="mt-4"
                      >
                        Gender
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={selectedGender}
                        onChange={handleGenderChange}
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                      <p>Selected Gender: {selectedGender}</p>
                    </FormControl>
                  </div>
                  <div className="col-md-12">
                    <label className="labels mt-3">Email ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter email id"
                      value={user.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  {userUpdated && (
                    <div>
                      <Alert severity="success">
                        Profile Updated Successfully
                      </Alert>
                    </div>
                  )}
                  {userNotUpdated && (
                    <Alert severity="error">Error Updating Profile</Alert>
                  )}
                  <button
                    className="btn btn-primary profile-button"
                    onClick={modalOpener}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={modalStyle}>
            <h2>Are you sure you want to update your profile?</h2>

            <Button
              variant="contained"
              color="primary"
              onClick={profileSaveHandler}
            >
              Yes
            </Button>
            <Button
              style={{ margin: "0.5rem" }}
              variant="contained"
              onClick={closeModal}
            >
              No
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCard;
