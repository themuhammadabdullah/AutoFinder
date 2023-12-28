//imports
import React from "react";
//material-ui
import { Avatar, Card } from "@mui/material";

const cardStyles = {
  width: "100%",
  margin: "10 0",
  padding: "20px 50px",
  textAlign: "center",
};

const stepContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
};

const stepStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function CarAdSteps() {
  return (
    <div>
      <Card style={cardStyles}>
        <h2 style={{ color: "#233D7B", fontWeight: "bold" }}>
          Sell your Car in 3 Steps!
        </h2>
        <p>It's free and takes less than a minute</p>
        <div style={stepContainerStyles}>
          <div style={stepStyles}>
            <Avatar
              alt="Car Info"
              src="https://wsa1.pakwheels.com/assets/sell-icons/car-221614dec8c0f3717dede556a5daad01.svg"
            />
            <p>Enter Car Information</p>
          </div>
          <div style={stepStyles}>
            <Avatar
              alt="Car Info"
              src="https://wsa1.pakwheels.com/assets/sell-icons/photos-708994063564767acaca738e1261f90d.svg"
            />
            <p>Upload Photos</p>
          </div>
          <div style={stepStyles}>
            <Avatar
              alt="Contact Info"
              src="https://cdn-icons-png.flaticon.com/512/2039/2039914.png?ga=GA1.1.855643881.1692868568"
              sx={{ width: 30, height: 30 }}
            />
            <p>Enter Contact Information</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CarAdSteps;
