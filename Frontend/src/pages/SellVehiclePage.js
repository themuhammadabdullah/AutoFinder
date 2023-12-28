//imports
import React from "react";
import Navbar from "../layout/Navbar/Navbar";
import CarAdCard from "../layout/PostCarAd/CarAdCard";
import BikeAdCard from "../layout/PostBikeAd/BikeAdCard";

//material-ui
import Grid from "@mui/material/Grid";

function SellVehiclePage() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item style={{ marginRight: "20px" }}>
          <CarAdCard />
        </Grid>
        <Grid item style={{ marginLeft: "20px" }}>
          <BikeAdCard />
        </Grid>
      </Grid>
    </>
  );
}

export default SellVehiclePage;
