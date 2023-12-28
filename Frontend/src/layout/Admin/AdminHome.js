//imports
import React, { useState, useEffect } from "react";
import DashboardContent from "./DashboardContent";
import clsx from "clsx";
import BikesView from "./BikesView";
import OrdersView from "./OrdersView";
import UsersView from "./UsersView";
import VehicleView from "./VehicleView";
import AddProductForm from "./AddProductForm";
import ProductsView from "./ProductsView";
import VideosView from "./VideosView";

//store
import { AdminLoggedIn, AdminLoggedOut } from "../../store/adminSlice";

//material-ui
import {
  AppBar,
  CssBaseline,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Avatar,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StoreIcon from "@mui/icons-material/Store";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

//hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 300;

const AdminHome = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    localStorage.getItem("selectedMenuItem") || "Dashboard"
  );
  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenuItemClick = (text) => {
    setSelectedMenuItem(text);
    localStorage.setItem("selectedMenuItem", text);

    switch (text) {
      case "Dashboard":
        navigate("/admin/home");
        break;
      case "Users":
        navigate("/admin/users");
        break;
      case "Cars":
        navigate("/admin/cars");
        break;
      case "Bikes":
        navigate("/admin/bikes");
        break;
      case "Add Product":
        navigate("/admin/add-product");
        break;
      case "View Products":
        navigate("/admin/view-products");
        break;
      case "Videos":
        navigate("/admin/videos");
        break;
      case "Orders":
        navigate("/admin/orders");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (open && e.target.closest(".appBar") === null) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  const LogOutHandler = () => {
    console.log("logout");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("AdminLoggedIn");
    localStorage.removeItem("selectedMenuItem");
    document.cookie =
      "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    dispatch(AdminLoggedOut());

    navigate("/admin");
  };
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <div
        className={clsx("appBar", {
          appBarShift: open,
        })}
      >
        <AppBar
          style={{ background: "linear-gradient( #000,#01336F)" }}
          position="fixed"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx("menuButton", open && "hide")}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {selectedMenuItem === "Dashboard"
                ? "Pakwheels Admin Dashboard"
                : selectedMenuItem}
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              <Avatar src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1406364553/kmsoahr21m6zogtykmsz.png" />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: "drawerPaper",
        }}
      >
        <div className="drawerHeader" style={{ marginTop: "20px" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            "Dashboard",
            "Users",
            "Cars",
            "Bikes",
            "Add Product",
            "View Products",
            "Videos",
            "Orders",
          ].map((text, index) => (
            <ListItem
              button
              key={text}
              selected={selectedMenuItem === text}
              onClick={() => handleMenuItemClick(text)}
            >
              <ListItemIcon>
                {index === 0 && <DashboardIcon />}
                {index === 1 && <PeopleAltIcon />}
                {index === 2 && <DriveEtaIcon />}
                {index === 3 && <DirectionsBikeIcon />}
                {index === 4 && <PostAddIcon />}
                {index === 5 && <StoreIcon />}
                {index === 6 && <YouTubeIcon />}
                {index === 7 && <LocalGroceryStoreIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <ListItem button key="Log Out" onClick={LogOutHandler}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx("content", {
          contentShift: open,
        })}
      >
        <div className="drawerHeader" />
        {selectedMenuItem === "Dashboard" && <DashboardContent />}
        {selectedMenuItem === "Users" && <UsersView />}
        {selectedMenuItem === "Cars" && <VehicleView />}
        {selectedMenuItem === "Bikes" && <BikesView />}

        {selectedMenuItem === "Add Product" && <AddProductForm />}
        {selectedMenuItem === "View Products" && <ProductsView />}
        {selectedMenuItem === "Videos" && <VideosView />}
        {selectedMenuItem === "Orders" && <OrdersView />}

        {selectedMenuItem === "Log Out" && LogOutHandler}
      </main>
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#E7232D",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" color="textSecondary">
          &copy; 2023 PAKWHEELS
        </Typography>
      </footer>
    </div>
  );
};

export default AdminHome;
