//imports
import React, { useState } from "react";
import HomeWidgetModal from "./HomeWidgetModal";

//hooks
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//material-ui
import { Grid, Typography, Button } from "@mui/material";

function Homewidget() {
  const user = useSelector((state) => state.authentication.user);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const navigate = useNavigate();
  const navigateToSellVehicle = () => {
    navigate("/sell-vehicle/post-ad");
  };

  return (
    <Grid container justifyContent="center" mt={4}>
      <Grid item xs={12} sm={8}>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "14px",
            padding: "3em",
          }}
        >
          <Typography
            style={{ color: "#5c5a55" }}
            variant="h5"
            component="h2"
            align="center"
            gutterBottom
          >
            Sell Your Car on Auto Finder and Get the Best Price
          </Typography>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} sm={5}>
              <Typography
                style={{ color: "#5c5a55" }}
                variant="h6"
                component="h3"
                color="primary"
                gutterBottom
              >
                Post your Ad on Auto Finder
              </Typography>
              <Typography variant="body1" style={{ fontSize: "15px" }}>
                ✔ Post your Ad for Free in 3 Easy Steps
              </Typography>
              <Typography variant="body1" style={{ fontSize: "14px" }}>
                ✔ Get Genuine offers from Verified Buyers
              </Typography>
              <Typography variant="body1" style={{ fontSize: "15px" }}>
                ✔ Sell your car Fast at the Best Price
              </Typography>
              {user ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "1em", outline: "none" }}
                  onClick={navigateToSellVehicle}
                >
                  Post Your Ad
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={openModal}
                  style={{ margin: "1em", outline: "none" }}
                >
                  Post Your Ad
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={2} align="center">
              <Typography
                style={{ color: "#5c5a55" }}
                variant="h6"
                gutterBottom
              >
                OR
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography
                variant="h6"
                component="h3"
                color="primary"
                gutterBottom
              >
                Try Auto Finder Sell It For Me
              </Typography>
              <Typography variant="body1" style={{ fontSize: "14px" }}>
                ✔ Dedicated Sales Expert to Sell your Car
              </Typography>
              <Typography variant="body1" style={{ fontSize: "13px" }}>
                ✔ We Bargain for you and share the Best Offer
              </Typography>
              <Typography variant="body1" style={{ fontSize: "15px" }}>
                ✔ We ensure Safe & Secure Transaction
              </Typography>
              {user ? (
                <Button
                  variant="contained"
                  color="primary"
                  disabled
                  style={{ margin: "1em", outline: "none" }}
                >
                  Coming Soon
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  onClick={openModal}
                  style={{ margin: "1em", outline: "none" }}
                >
                  Register Your Car
                </Button>
              )}
              <HomeWidgetModal isOpen={modalIsOpen} closeModal={closeModal} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default Homewidget;
