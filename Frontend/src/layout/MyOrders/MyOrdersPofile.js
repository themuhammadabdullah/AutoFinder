//imports
import React from "react";

//material-ui
import { Card, Avatar } from "@mui/material";

//hooks
import { useSelector } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function MyOrdersPofile() {
  const user = useSelector((state) => state.authentication.user);
  const [selectedGender, setSelectedGender] = useState(user.gender);

  //styles
  const cardStyles = {
    width: "100%",
    margin: "10px 0",
    padding: "0px",
    textAlign: "center",
  };

  const stepContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };

  const stepStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  };

  const avatarStyles = {
    marginRight: "20px",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  };

  const textContainerStyles = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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

  const registrationDate = new Date(user.createdAt);
  const formattedDate = registrationDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container rounded bg-white mb-4 ">
      <div className="row">
        <div className="col-md-2 border-right ">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="120px"
              src={profileImageUrl}
              alt="Profile"
            />
            <span> </span>
          </div>
        </div>
        <div className="col-md-10 border-right">
          <form>
            <div className="p-3 py-5 mt-5">
              <div className="d-flex justify-content-between align-items-center ">
                <h2
                  style={{ color: "#223C7A", fontWeight: "bold" }}
                  className="text-right"
                >
                  {user.name}
                </h2>
              </div>
              <div className="row mt-2">
                <div className="col-md-12 d-flex justify-content-between align-items-center ">
                  <p className="text-right">Member Since {formattedDate}</p>
                </div>
              </div>

              <div className="row mt-0">
                <div className="col-md-12 d-flex justify-content-between align-items-center ">
                  <NavLink to={`/profile/${user._id}`}>Edit Profile</NavLink>
                </div>
                <hr></hr>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyOrdersPofile;
