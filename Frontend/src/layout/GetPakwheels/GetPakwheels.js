//imports
import React from "react";

//material-ui
import { Container, Grid, Typography, Link } from "@mui/material"; // Import Material-UI components

function GetPakwheels() {
  return (
    <Container
      sx={{
        background: "#F2F3F3",
        padding: "5em ",
        marginTop: "4em",
        marginBottom: "2em",
      }}
    >
      <Container>
        <Grid container>
          <Grid item md={9}>
            <Grid container alignItems="center">
              <Grid item md={8}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#233D7B",
                    fontWeight: "bold",
                  }}
                >
                  Get The Auto Finder App
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                  Explore a wide range of new and used vehicles. Find your dream
                  car or bike with Auto Finder.
                  <br /> using our App
                </Typography>
                <Link
                  // href="https://play.google.com/store/apps/details?id=com.pakwheels&hl=en&gl=US&pli=1"
                  target="_blank"
                  title="PakWheels Android App"
                >
                  <img
                    alt="Google-play-badge"
                    height="40"
                    loading="lazy"
                    src="https://wsa4.pakwheels.com/assets/google-play-badge-f4bed6cbd8a3a1be7c79377c4441447a.svg"
                  />
                </Link>
                <Link
                  // href="https://apps.apple.com/pk/app/pakwheels-buy-sell-cars/id739776365"
                  sx={{ ml: 1, mr: 1 }}
                  target="_blank"
                  title="PakWheels iOS App"
                >
                  <img
                    alt="App-store-badge"
                    height="40"
                    loading="lazy"
                    src="https://wsa1.pakwheels.com/assets/app-store-badge-4d05ff70e5546f31e3891739ea40abad.svg"
                  />
                </Link>
                <Link
                  href="https://appgallery.huawei.com/#/app/C101437147"
                  target="_blank"
                  title="PakWheels Android App"
                >
                  <img
                    alt="Huawei-store-badge"
                    height="40"
                    loading="lazy"
                    src="https://wsa4.pakwheels.com/assets/huawei-store-badge-7ad06f9ffe74b644d49c6221af98f5b3.svg"
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default GetPakwheels;
