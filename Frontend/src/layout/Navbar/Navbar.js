//imports
import React, { useState, useEffect } from "react";
import NavHeader from "./NavHeader";

//material-ui
import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Hidden,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

//hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//store
import { Activate, Deactivate } from "../../store/navbarSlice";

//toastify
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const isHomePage = location.pathname === "/";
  const user = useSelector((state) => state.authentication.user);

  const activeTab = useSelector((state) => state.navbar.activeTab);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const sellCarOpener = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in first to post an ad.");
    } else {
      navigate("/sell-vehicle/post-ad");
    }
  };

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/my-cart") {
      dispatch(Deactivate());
    } else if (location.pathname === "/used-cars") {
      dispatch(Activate({ user: "Used Cars" }));
    } else if (location.pathname === "/used-bikes") {
      dispatch(Activate({ user: "Used Bikes" }));
    } else if (location.pathname === "/autostore") {
      dispatch(Activate({ user: "AutoStore" }));
    } else if (location.pathname === "/videos") {
      dispatch(Activate({ user: "Videos" }));
    } else if (location.pathname === "/sell-vehicle/post-ad") {
      dispatch(Deactivate());
    }
  }, [dispatch, location.pathname]);

  const handleOptionClick = (option) => {
    console.log(option);
    setSelectedOption(option);
    switch (option) {
      case "Used Cars":
        navigate("/used-cars");
        break;
      case "Used Bikes":
        navigate("/used-bikes");
        break;
      case "AutoStore":
        navigate("/autostore");
        break;
      case "Videos":
        navigate("/videos");
        break;
      case "More":
        handleDialogOpen();
        break;
      default:
        break;
    }
  };
  const handleLogoClick = () => {
    localStorage.removeItem("ActiveTab");
    dispatch(Deactivate());
  };

  return (
    <>
      <div
        style={{
          background: isHomePage
            ? "transparent"
            : "linear-gradient( #000,#01336F)",
          padding: "0px 40px",
          height: "25vh",
        }}
      >
        <NavHeader />
        <hr
          style={{
            backgroundColor: "gray",
            height: "1px",
            border: "none",
            margin: "0px",
            marginBottom: "10px",
          }}
        />

        <AppBar
          position="static"
          color="transparent"
          style={{
            borderRadius: "1em",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs>
                <a href="/">
                  <img
                    src="https://wsa1.pakwheels.com/assets/new-pw-logo-white-b8b4c00b25fde9cc8f514dc4947c266a.svg"
                    alt="logo"
                    width="150"
                    height="40"
                    onClick={handleLogoClick}
                  />
                </a>
              </Grid>
              <Hidden smDown>
                <Grid item xs>
                  <Button
                    variant="contained"
                    style={{
                      background: "transparent",
                      borderRadius: "10px",
                      height: "40px",
                      color: "white",
                      textAlign: "center",
                      boxShadow: "none",
                      border:
                        activeTab === "Used Cars" ? "1px solid white" : "none",
                      color: activeTab === "Used Cars" ? "red" : "white",
                    }}
                    onClick={() => handleOptionClick("Used Cars")}
                  >
                    Used Cars
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    variant="contained"
                    style={{
                      background: "transparent",
                      borderRadius: "10px",
                      height: "40px",
                      color: "white",
                      textAlign: "center",
                      boxShadow: "none",
                      border:
                        activeTab === "Used Bikes" ? "1px solid white" : "none",
                      color: activeTab === "Used Bikes" ? "red" : "white",
                    }}
                    onClick={() => handleOptionClick("Used Bikes")}
                  >
                    Used Bikes
                  </Button>
                </Grid>
                <ToastContainer />
                <Grid item xs>
                  <Button
                    variant="contained"
                    style={{
                      background: "transparent",
                      borderRadius: "10px",
                      height: "40px",
                      color: "white",
                      textAlign: "center",
                      boxShadow: "none",
                      border:
                        activeTab === "AutoStore" ? "1px solid white" : "none",
                      color: activeTab === "AutoStore" ? "red" : "white",
                    }}
                    onClick={() => handleOptionClick("AutoStore")}
                  >
                    AutoStore
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    variant="contained"
                    style={{
                      background: "transparent",
                      borderRadius: "10px",
                      height: "40px",
                      color: "white",
                      textAlign: "center",
                      boxShadow: "none",
                      border:
                        activeTab === "Videos" ? "1px solid white" : "none",
                      color: activeTab === "Videos" ? "red" : "white",
                    }}
                    onClick={() => handleOptionClick("Videos")}
                  >
                    Videos
                  </Button>
                </Grid>
              </Hidden>
              <Grid item xs>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#B73439",
                    borderRadius: "10px",
                    height: "40px",
                    color: "white",
                    textAlign: "center",
                    boxShadow: "none",
                    outline: "none",
                    border: "none",
                  }}
                  onClick={sellCarOpener}
                >
                  Post An Ad
                </Button>
              </Grid>
              <Hidden mdUp>
                <Grid item xs>
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMobileMenuOpen}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={mobileMenuAnchor}
                    keepMounted
                    open={Boolean(mobileMenuAnchor)}
                    onClose={handleMobileMenuClose}
                  >
                    <MenuItem
                      onClick={() => handleOptionClick("Used Cars")}
                      style={{
                        border:
                          activeTab === "Used Cars"
                            ? "1px solid white"
                            : "none",
                        color: activeTab === "Used Cars" ? "red" : "black",
                      }}
                    >
                      Used Cars
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleOptionClick("Used Bikes")}
                      style={{
                        border:
                          activeTab === "Used Bikes"
                            ? "1px solid white"
                            : "none",
                        color: activeTab === "Used Bikes" ? "red" : "black",
                      }}
                    >
                      Used Bikes
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleOptionClick("AutoStore")}
                      style={{
                        border:
                          activeTab === "AutoStore"
                            ? "1px solid white"
                            : "none",
                        color: activeTab === "AutoStore" ? "red" : "black",
                      }}
                    >
                      AutoStore
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleOptionClick("Videos")}
                      style={{
                        border:
                          activeTab === "Videos" ? "1px solid white" : "none",
                        color: activeTab === "Videos" ? "red" : "black",
                      }}
                    >
                      Videos
                    </MenuItem>
                  </Menu>
                </Grid>
              </Hidden>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default Navbar;
