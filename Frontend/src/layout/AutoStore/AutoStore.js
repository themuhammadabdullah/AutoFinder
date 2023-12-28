//imports
import React from "react";
import AutoStoreElements from "./AutoStoreElements";

//material-ui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//hooks
import { useDispatch } from "react-redux";
import { Activate } from "../../store/navbarSlice";
import { useNavigate } from "react-router-dom";

function AutoStore() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AutoStoreNavigate = (e) => {
    e.preventDefault();
    dispatch(Activate({ user: "AutoStore" }));

    navigate("/autostore");
  };
  return (
    <Box
      sx={{
        background: "#F2F3F3",
        padding: "40px 40px",
        marginTop: "10em",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        fontWeight="bold"
        padding="20px 0px"
      >
        <a onClick={AutoStoreNavigate} style={{ color: "black" }}>
          AutoStore
        </a>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AutoStoreElements />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AutoStore;
