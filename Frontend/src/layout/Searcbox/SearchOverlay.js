//imports
import React from "react";
import Searchbox from "./Searchbox";
import Navbar from "../Navbar/Navbar";
import BackgroundImage from "../../assets/images/musti1.webp";

//material-ui
import { Grid, Container } from "@mui/material";

function SearchOverlay() {
  return (
    <div
      style={{
        backgroundImage: `url()`, // Use the imported variable or directly write the path
        backgroundSize: "cover", // Adjust the image size as needed
        backgroundRepeat: "no-repeat", // Prevent image repetition
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column">
          <Grid item>
            <Navbar />
          </Grid>
          <Grid item>
            <Searchbox />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SearchOverlay;
