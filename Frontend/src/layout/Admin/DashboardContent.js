//imports
import React, { useState, useEffect } from "react";

//material-ui
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Skeleton } from "@mui/material";

//hooks
import { useDispatch, useSelector } from "react-redux";

//store
import { AdsData, UsersData } from "../../store/adminSlice";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

const notClickableButtonStyle = {
  pointerEvents: "none",
  opacity: 1,
};
function DashboardContent() {
  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [videos, setVideos] = useState([]);
  const [products, setProducts] = useState([]);
  const [adsData, setaAdsData] = useState([]);
  const [bikeAdsData, setBikeAdsData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    getAllAds();
    getUsersData();
    getVideos();
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getProducts"
      );

      if (response.status === 200) {
        const productsData = response.data.products;
        setProducts(productsData);
      } else {
        toast.error("Failed to load products: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading products error: " + error);
      toast.error("Failed to load products: " + error.toString());
    }
  };

  const getVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/getVideo", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const videos = response.data.videos;
        setVideos(videos);
      } else {
        toast.error("Failed to get Videos: " + response.data.message);
      }
    } catch (error) {
      console.error("Video fetch error: " + error);
      toast.error("Failed to Get videos: " + error.toString());
    }
  };
  const getUsersData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getEveryAd"
      );

      if (response.status === 200) {
        const users = response.data.users;
        setUsersData(users);
      } else {
        toast.error("Failed to load users: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading users error: " + error);
      toast.error("Failed to load users: " + error.toString());
    }
  };
  const getAllAds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getEveryAd"
      );

      if (response.status === 200) {
        const ads = response.data.cars;
        const users = response.data.users;
        const bikes = response.data.bikes;

        setaAdsData(ads);
        setBikeAdsData(bikes);
      } else {
        toast.error("Failed to load ads: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading ads error: " + error);
      toast.error("Failed to load ads: " + error.toString());
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "3em",
        background: "#F2F3F3",
      }}
    >
      <ToastContainer />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "5em",
            padding: "3em",
          }}
        >
          {[1, 2, 3].map((index) => (
            <div
              style={{ padding: "20px", margin: "10px", marginTop: "-20px" }}
              key={index}
            >
              <Skeleton
                variant="rect"
                style={{ width: "20em", padding: "3em" }}
                height={150}
              />
            </div>
          ))}

          {[4, 5, 6].map((index) => (
            <div
              style={{ padding: "20px", margin: "10px", marginTop: "-20px" }}
              key={index}
            >
              <Skeleton
                variant="rect"
                style={{ width: "20em", padding: "3em" }}
                height={150}
              />
            </div>
          ))}
        </div>
      ) : adsData && adsData.length > 0 ? (
        <div style={{ justifyContent: "center" }}>
          <Grid container spacing={4} style={{ marginTop: "35px" }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ width: "20em" }}>
                <Paper elevation={3}>
                  <CardContent
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <Typography variant="h5" component="div">
                        Total Vehicles
                      </Typography>
                      <Typography variant="h3">
                        {adsData.length + bikeAdsData.length}
                      </Typography>
                    </div>
                    <Avatar
                      alt="Car Avatar"
                      src="https://image.shutterstock.com/image-vector/set-all-transport-means-world-260nw-2223117993.jpg"
                      sx={{ width: 100, height: 100 }}
                    />
                  </CardContent>
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Pending Approval (
                      {adsData.filter((ad) => ad.isApproved === null).length +
                        bikeAdsData.filter((ad) => ad.isApproved === null)
                          .length}
                      )
                    </Button>
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Approved (
                      {adsData.filter((ad) => ad.isApproved).length +
                        bikeAdsData.filter((ad) => ad.isApproved).length}
                      )
                    </Button>
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Removed (
                      {adsData.filter((ad) => ad.isApproved === false).length +
                        bikeAdsData.filter((ad) => ad.isApproved === false)
                          .length}
                      )
                    </Button>
                  </CardActions>
                </Paper>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ width: "20em" }}>
                <Paper elevation={3}>
                  <CardContent
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <Typography variant="h5" component="div">
                        Total Cars
                      </Typography>
                      <Typography variant="h3">{adsData.length}</Typography>
                    </div>
                    <Avatar
                      alt="Car Avatar"
                      src="https://img.freepik.com/free-vector/modern-blue-urban-adventure-suv-vehicle-illustration_1344-205.jpg?w=740&t=st=1695727547~exp=1695728147~hmac=737feb57e9ff6c540fba1b0d810f5463ad1096d0770778e8f8aaaea55a86ed42s"
                      sx={{
                        width: 100,
                        height: 100,
                      }}
                    />
                  </CardContent>
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Pending Approval (
                      {adsData.filter((ad) => ad.isApproved === null).length})
                    </Button>
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Approved ({adsData.filter((ad) => ad.isApproved).length})
                    </Button>
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Removed (
                      {adsData.filter((ad) => ad.isApproved === false).length})
                    </Button>
                  </CardActions>
                </Paper>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ width: "20em" }}>
                <Paper elevation={3}>
                  <CardContent
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div style={{ flex: 1 }}>
                      <Typography variant="h5" component="div">
                        Total Bikes
                      </Typography>
                      <Typography variant="h3">{bikeAdsData.length}</Typography>
                    </div>
                    <Avatar
                      alt="Car Avatar"
                      src="https://images.vexels.com/media/users/3/152654/isolated/lists/e5694fb12916c00661195c0a833d1ba9-sports-bike-icon.png"
                      sx={{ width: 100, height: 100 }}
                    />
                  </CardContent>
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Pending Approval (
                      {
                        bikeAdsData.filter((ad) => ad.isApproved === null)
                          .length
                      }
                      )
                    </Button>
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Approved (
                      {bikeAdsData.filter((ad) => ad.isApproved).length})
                    </Button>
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Removed (
                      {
                        bikeAdsData.filter((ad) => ad.isApproved === false)
                          .length
                      }
                      )
                    </Button>
                  </CardActions>
                </Paper>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ width: "20em" }}>
                <Paper elevation={3}>
                  <CardContent
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div style={{ flex: 1 }}>
                      <Typography variant="h5" component="div">
                        Total Videos
                      </Typography>
                      <Typography variant="h3">{videos.length}</Typography>
                    </div>
                    <Avatar
                      alt="Car Avatar"
                      src="https://static.thenounproject.com/png/897669-200.png"
                      sx={{ width: 100, height: 100 }}
                    />
                  </CardContent>
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Currently Live ({videos.length})
                    </Button>
                  </CardActions>
                </Paper>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ width: "20em" }}>
                <Paper elevation={3}>
                  <CardContent
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div style={{ flex: 1 }}>
                      <Typography variant="h5" component="div">
                        Total Users
                      </Typography>
                      <Typography variant="h3">{usersData.length}</Typography>
                    </div>
                    <Avatar
                      alt="Car Avatar"
                      src="https://img.freepik.com/free-vector/people-outdoor-card_24908-55055.jpg?w=360&t=st=1695728414~exp=1695729014~hmac=440939e22e2a66bb20f95df5b0d40dcdf45cf9ebd1838e4f78979e0c778516e2"
                      sx={{ width: 100, height: 100 }}
                    />
                  </CardContent>
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Verified (
                      {usersData.filter((user) => user.isVerified).length})
                    </Button>

                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Banned ({usersData.filter((user) => user.isBanned).length}
                      )
                    </Button>
                  </CardActions>
                </Paper>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ width: "20em" }}>
                <Paper elevation={3}>
                  <CardContent
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div style={{ flex: 1 }}>
                      <Typography variant="h5" component="div">
                        Total Products
                      </Typography>
                      <Typography variant="h3">{products.length}</Typography>
                    </div>
                    <Avatar
                      alt="Car Avatar"
                      src="https://img.freepik.com/premium-vector/engine-oil-filters-isolated-white-background_258836-181.jpg?w=740"
                      sx={{ width: 100, height: 100 }}
                    />
                  </CardContent>

                  <CardActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      style={notClickableButtonStyle}
                      size="small"
                      color="primary"
                    >
                      Currently Live ({products.length})
                    </Button>
                  </CardActions>
                </Paper>
              </Card>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Typography variant="body2">No data available</Typography>
      )}
    </div>
  );
}

export default DashboardContent;
