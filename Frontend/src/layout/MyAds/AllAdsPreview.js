//imports
import React, { useState, useEffect } from "react";

//material-ui
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  ButtonGroup,
} from "@mui/material";

//hooks
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

//react tabs
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function AllAdsPreview() {
  const user = useSelector((state) => state.authentication.user);
  const [isLoading, setIsLoading] = useState(false);
  const [adsData, setAdsData] = useState([]);
  const [BikeAdsData, setBikeAdsData] = useState([]);

  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    getAllAds();
  }, []);

  const getAllAds = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/ad/getAllAds",
        {
          user: user,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        const ads = response.data.ads;
        const BikeAds = response.data.bikeAds;
        setAdsData(ads);
        setBikeAdsData(BikeAds);
      } else {
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Loading ads error: " + error);
      toast.error(error.toString());
    }
  };

  const sortAdsByTimestamp = (ads, sortOrder) => {
    return ads.slice().sort((a, b) => {
      if (sortOrder === "latest") {
        return b.createdAt.localeCompare(a.createdAt);
      } else if (sortOrder === "earliest") {
        return a.createdAt.localeCompare(b.createdAt);
      }
      return 0;
    });
  };

  const sortAds = (ads, sortOrder) => {
    return sortAdsByTimestamp(ads, sortOrder);
  };
  const navigate = useNavigate();
  const navigateToPostAd = (ads, sortOrder) => {
    navigate("/sell-vehicle/post-ad");
  };
  const approvedAds = adsData.filter((ad) => ad.isApproved === true);
  const pendingAds = adsData.filter((ad) => ad.isApproved === null);
  const removedAds = adsData.filter((ad) => ad.isApproved === false);

  const approvedAdsBike = BikeAdsData.filter(
    (BikeAds) => BikeAds.isApproved === true
  );
  const pendingAdsBike = BikeAdsData.filter(
    (BikeAds) => BikeAds.isApproved === null
  );
  const removedAdsBike = BikeAdsData.filter(
    (BikeAds) => BikeAds.isApproved === false
  );

  return (
    <div className="container rounded bg-white mt-1 mb-1  px-4  py-3">
      <hr
        style={{
          borderTop: "2px solid #333",
          width: "100%",
          margin: "20px auto",
        }}
      />
      <div className="row">
        <div className="col-md-12">
          <ToastContainer />
          <div className="d-flex justify-content-end mb-3">
            <ButtonGroup
              disableElevation
              variant="contained"
              color="primary"
              aria-label="Sort by"
            >
              <Button
                onClick={() => setSortBy("latest")}
                className={
                  sortBy === "latest" ? "MuiButton-containedPrimary" : ""
                }
              >
                Sort by Latest
              </Button>
              <Button
                onClick={() => setSortBy("earliest")}
                className={
                  sortBy === "earliest" ? "MuiButton-containedPrimary" : ""
                }
              >
                Sort by Earliest
              </Button>
            </ButtonGroup>
          </div>
          <Tabs>
            <TabList>
              <Tab>All Ads</Tab>
              <Tab>Approved</Tab>
              <Tab>Pending Approval</Tab>
              <Tab>Removed</Tab>
            </TabList>
            <TabPanel>
              {isLoading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : (
                <div>
                  {adsData.length === 0 && BikeAdsData.length === 0 && (
                    <div>
                      <p
                        style={{
                          marginRight: "10px",
                          borderRadius: "5px",
                          flex: "1",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "40px",
                        }}
                      >
                        You haven't posted any ad
                      </p>
                      <Button
                        style={{
                          marginRight: "10px",
                          borderRadius: "5px",
                          flex: "1",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={navigateToPostAd}
                      >
                        Post Ad
                      </Button>
                    </div>
                  )}
                  {sortAds(adsData, sortBy).map((ad, index) => (
                    <Card key={index} className="mt-3">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0px 20px",
                        }}
                      >
                        <div style={{ padding: "20px" }}>
                          <Typography
                            variant="h4"
                            color="#223C7A"
                            component="div"
                          >
                            {ad.modelName}
                          </Typography>
                          <Typography color="text.secondary">
                            Price: {ad.price}
                          </Typography>
                          <Typography color="text.secondary">
                            Available in: {ad.city}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "0px 20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {ad.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                flex: "1",
                                marginBottom: "10px",
                                maxWidth: "calc(33.33% - 10px)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                style={{
                                  height: "80%",
                                  maxWidth: "80%",
                                  objectFit: "cover",
                                }}
                                image={`http://localhost:8080/${image.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={ad.modelName}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <CardContent>
                        <div style={{ padding: "0px 20px" }}>
                          <Typography variant="h6">Car Details</Typography>

                          <Typography color="text.secondary">
                            Mileage: {ad.mileage + " km"}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Capacity: {ad.engineCapacity + " cc"}
                          </Typography>
                          <Typography color="text.secondary">
                            Color: {ad.color}
                          </Typography>
                          <Typography color="text.secondary">
                            Transmission : {ad.transmission}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Type: {ad.engineType}
                          </Typography>
                          {ad.features.length > 0 && (
                            <div className="mt-3">
                              <Typography color="text.primary">
                                Features:
                              </Typography>
                              <ul>
                                {ad.features.map((feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    style={{ color: "green" }}
                                  >
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: "right" }}>
                          {ad.isApproved === null ? (
                            <span
                              style={{
                                background: "#454E56",
                                color: "#B2BECD",
                                display: "inline-block",
                                borderRadius: "3px",
                                padding: ".2em .5em .3em",
                                fontSize: "1.2em",
                                fontWeight: "600",
                                margin: ".25em .1em",
                              }}
                            >
                              Pending Approval
                            </span>
                          ) : ad.isApproved === false ? (
                            <span
                              style={{
                                background: "#dc0530",
                                color: "#fff",
                                display: "inline-block",
                                borderRadius: "3px",
                                padding: ".2em .5em .3em",
                                fontSize: "1.2em",
                                fontWeight: "600",
                                margin: ".25em .1em",
                              }}
                            >
                              Removed
                            </span>
                          ) : (
                            <span
                              style={{
                                background: "var(--green)",
                                color: "#fff",
                                display: "inline-block",
                                borderRadius: "4px",
                                padding: ".2em .5em .3em",
                                fontSize: "1.2em",
                                fontWeight: "600",
                                margin: ".25em .1em",
                              }}
                            >
                              Approved
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {sortAds(BikeAdsData, sortBy).map((ad, index) => (
                    <Card key={index} className="mt-3">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0px 20px",
                        }}
                      >
                        <div style={{ padding: "20px" }}>
                          <Typography
                            variant="h4"
                            color="#223C7A"
                            component="div"
                          >
                            {ad.modelName}
                          </Typography>
                          <Typography color="text.secondary">
                            Price: {ad.price}
                          </Typography>
                          <Typography color="text.secondary">
                            Available in: {ad.city}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "0px 20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {ad.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                flex: "1",
                                marginBottom: "10px",
                                maxWidth: "calc(33.33% - 10px)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                style={{
                                  height: "80%",
                                  maxWidth: "80%",
                                  objectFit: "cover",
                                }}
                                image={`http://localhost:8080/${image.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={ad.modelName}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <CardContent>
                        <div style={{ padding: "0px 20px" }}>
                          <Typography variant="h6">Bike Details</Typography>

                          <Typography color="text.secondary">
                            Mileage: {ad.mileage + " km"}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Capacity: {ad.engineCapacity + " cc"}
                          </Typography>
                          <Typography color="text.secondary">
                            Color: {ad.color}
                          </Typography>

                          <Typography color="text.secondary">
                            Engine Type: {ad.engineType}
                          </Typography>
                          {ad.features.length > 0 && (
                            <div className="mt-3">
                              <Typography color="text.primary">
                                Features:
                              </Typography>
                              <ul>
                                {ad.features.map((feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    style={{ color: "green" }}
                                  >
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: "right" }}>
                          {ad.isApproved === null ? (
                            <span
                              style={{
                                background: "#454E56",
                                color: "#B2BECD",
                                display: "inline-block",
                                borderRadius: "3px",
                                padding: ".2em .5em .3em",
                                fontSize: "1.2em",
                                fontWeight: "600",
                                margin: ".25em .1em",
                              }}
                            >
                              Pending Approval
                            </span>
                          ) : ad.isApproved === false ? (
                            <span
                              style={{
                                background: "#dc0530",
                                color: "#fff",
                                display: "inline-block",
                                borderRadius: "3px",
                                padding: ".2em .5em .3em",
                                fontSize: "1.2em",
                                fontWeight: "600",
                                margin: ".25em .1em",
                              }}
                            >
                              Removed
                            </span>
                          ) : (
                            <span
                              style={{
                                background: "var(--green)",
                                color: "#fff",
                                display: "inline-block",
                                borderRadius: "4px",
                                padding: ".2em .5em .3em",
                                fontSize: "1.2em",
                                fontWeight: "600",
                                margin: ".25em .1em",
                              }}
                            >
                              Approved
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {isLoading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : (
                <div>
                  {adsData.length === 0 && BikeAdsData.length === 0 && (
                    <div>
                      <p
                        style={{
                          marginRight: "10px",
                          borderRadius: "5px",
                          flex: "1",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "40px",
                        }}
                      >
                        You haven't posted any ad
                      </p>
                      <Button
                        style={{
                          marginRight: "10px",
                          borderRadius: "5px",
                          flex: "1",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={navigateToPostAd}
                      >
                        Post Ad
                      </Button>
                    </div>
                  )}
                  {sortAds(approvedAds, sortBy).map((ad, index) => (
                    <Card key={index} className="mt-3">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0px 20px",
                        }}
                      >
                        <div style={{ padding: "20px" }}>
                          <Typography
                            variant="h4"
                            color="#223C7A"
                            component="div"
                          >
                            {ad.modelName}
                          </Typography>
                          <Typography color="text.secondary">
                            Price: {ad.price}
                          </Typography>
                          <Typography color="text.secondary">
                            Available in: {ad.city}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "0px 20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {ad.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                flex: "1",
                                marginBottom: "10px",
                                maxWidth: "calc(33.33% - 10px)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                style={{
                                  height: "80%",
                                  maxWidth: "80%",
                                  objectFit: "cover",
                                }}
                                image={`http://localhost:8080/${image.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={ad.modelName}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <CardContent>
                        <div style={{ padding: "0px 20px" }}>
                          <Typography variant="h6">Car Details</Typography>

                          <Typography color="text.secondary">
                            Mileage: {ad.mileage + " km"}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Capacity: {ad.engineCapacity + " cc"}
                          </Typography>
                          <Typography color="text.secondary">
                            Color: {ad.color}
                          </Typography>
                          <Typography color="text.secondary">
                            Transmission : {ad.transmission}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Type: {ad.engineType}
                          </Typography>
                          {ad.features.length > 0 && (
                            <div className="mt-3">
                              <Typography color="text.primary">
                                Features:
                              </Typography>
                              <ul>
                                {ad.features.map((feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    style={{ color: "green" }}
                                  >
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span
                            style={{
                              background: "var(--green)",
                              color: "#fff",
                              borderRadius: "3px",
                              padding: ".2em .5em .3em",
                              fontSize: "1.2em",
                              fontWeight: "600",
                              margin: "-20.25em .1em",
                            }}
                          >
                            Approved
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {sortAds(approvedAdsBike, sortBy).map((ad, index) => (
                    <Card key={index} className="mt-3">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0px 20px",
                        }}
                      >
                        <div style={{ padding: "20px" }}>
                          <Typography
                            variant="h4"
                            color="#223C7A"
                            component="div"
                          >
                            {ad.modelName}
                          </Typography>
                          <Typography color="text.secondary">
                            Price: {ad.price}
                          </Typography>
                          <Typography color="text.secondary">
                            Available in: {ad.city}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "0px 20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {ad.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                flex: "1",
                                marginBottom: "10px",
                                maxWidth: "calc(33.33% - 10px)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                style={{
                                  height: "80%",
                                  maxWidth: "80%",
                                  objectFit: "cover",
                                }}
                                image={`http://localhost:8080/${image.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={ad.modelName}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <CardContent>
                        <div style={{ padding: "0px 20px" }}>
                          <Typography variant="h6">Bike Details</Typography>

                          <Typography color="text.secondary">
                            Mileage: {ad.mileage + " km"}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Capacity: {ad.engineCapacity + " cc"}
                          </Typography>
                          <Typography color="text.secondary">
                            Color: {ad.color}
                          </Typography>

                          <Typography color="text.secondary">
                            Engine Type: {ad.engineType}
                          </Typography>
                          {ad.features.length > 0 && (
                            <div className="mt-3">
                              <Typography color="text.primary">
                                Features:
                              </Typography>
                              <ul>
                                {ad.features.map((feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    style={{ color: "green" }}
                                  >
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span
                            style={{
                              background: "var(--green)",
                              color: "#fff",
                              borderRadius: "3px",
                              padding: ".2em .5em .3em",
                              fontSize: "1.2em",
                              fontWeight: "600",
                              margin: "-20.25em .1em",
                            }}
                          >
                            Approved
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {isLoading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : (
                <div>
                  {adsData.length === 0 && BikeAdsData.length === 0 && (
                    <div>
                      <p
                        style={{
                          marginRight: "10px",
                          borderRadius: "5px",
                          flex: "1",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "40px",
                        }}
                      >
                        You haven't posted any ad
                      </p>
                      <Button
                        style={{
                          marginRight: "10px",
                          borderRadius: "5px",
                          flex: "1",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={navigateToPostAd}
                      >
                        Post Ad
                      </Button>
                    </div>
                  )}
                  {sortAds(pendingAds, sortBy).map((ad, index) => (
                    <Card key={index} className="mt-3">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0px 20px",
                        }}
                      >
                        <div style={{ padding: "20px" }}>
                          <Typography
                            variant="h4"
                            color="#223C7A"
                            component="div"
                          >
                            {ad.modelName}
                          </Typography>
                          <Typography color="text.secondary">
                            Price: {ad.price}
                          </Typography>
                          <Typography color="text.secondary">
                            Available in: {ad.city}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "0px 20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {ad.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                flex: "1",
                                marginBottom: "10px",
                                maxWidth: "calc(33.33% - 10px)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                style={{
                                  height: "80%",
                                  maxWidth: "80%",
                                  objectFit: "cover",
                                }}
                                image={`http://localhost:8080/${image.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={ad.modelName}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <CardContent>
                        <div style={{ padding: "0px 20px" }}>
                          <Typography variant="h6">Car Details</Typography>

                          <Typography color="text.secondary">
                            Mileage: {ad.mileage + " km"}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Capacity: {ad.engineCapacity + " cc"}
                          </Typography>
                          <Typography color="text.secondary">
                            Color: {ad.color}
                          </Typography>
                          <Typography color="text.secondary">
                            Transmission : {ad.transmission}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Type: {ad.engineType}
                          </Typography>
                          {ad.features.length > 0 && (
                            <div className="mt-3">
                              <Typography color="text.primary">
                                Features:
                              </Typography>
                              <ul>
                                {ad.features.map((feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    style={{ color: "green" }}
                                  >
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span
                            style={{
                              background: "#454E56",
                              color: "#B2BECD",
                              display: "inline-block",
                              borderRadius: "3px",
                              padding: ".2em .5em .3em",
                              fontSize: "1.2em",
                              fontWeight: "600",
                              margin: ".25em .1em",
                            }}
                          >
                            Pending Approval
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {sortAds(pendingAdsBike, sortBy).map((ad, index) => (
                    <Card key={index} className="mt-3">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0px 20px",
                        }}
                      >
                        <div style={{ padding: "20px" }}>
                          <Typography
                            variant="h4"
                            color="#223C7A"
                            component="div"
                          >
                            {ad.modelName}
                          </Typography>
                          <Typography color="text.secondary">
                            Price: {ad.price}
                          </Typography>
                          <Typography color="text.secondary">
                            Available in: {ad.city}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "0px 20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {ad.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                flex: "1",
                                marginBottom: "10px",
                                maxWidth: "calc(33.33% - 10px)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                style={{
                                  height: "80%",
                                  maxWidth: "80%",
                                  objectFit: "cover",
                                }}
                                image={`http://localhost:8080/${image.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={ad.modelName}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <CardContent>
                        <div style={{ padding: "0px 20px" }}>
                          <Typography variant="h6">Bike Details</Typography>

                          <Typography color="text.secondary">
                            Mileage: {ad.mileage + " km"}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Capacity: {ad.engineCapacity + " cc"}
                          </Typography>
                          <Typography color="text.secondary">
                            Color: {ad.color}
                          </Typography>

                          <Typography color="text.secondary">
                            Engine Type: {ad.engineType}
                          </Typography>
                          {ad.features.length > 0 && (
                            <div className="mt-3">
                              <Typography color="text.primary">
                                Features:
                              </Typography>
                              <ul>
                                {ad.features.map((feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    style={{ color: "green" }}
                                  >
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span
                            style={{
                              background: "#454E56",
                              color: "#B2BECD",
                              display: "inline-block",
                              borderRadius: "3px",
                              padding: ".2em .5em .3em",
                              fontSize: "1.2em",
                              fontWeight: "600",
                              margin: ".25em .1em",
                            }}
                          >
                            Pending Approval
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {isLoading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : (
                <div>
                  {adsData.length === 0 && BikeAdsData.length === 0 && (
                    <div>
                      <p
                        style={{
                          marginRight: "10px",
                          borderRadius: "5px",
                          flex: "1",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "40px",
                        }}
                      >
                        You haven't posted any ad
                      </p>
                      <Button
                        style={{
                          marginRight: "10px",
                          borderRadius: "5px",
                          flex: "1",
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={navigateToPostAd}
                      >
                        Post Ad
                      </Button>
                    </div>
                  )}
                  {sortAds(removedAds, sortBy).map((ad, index) => (
                    <Card key={index} className="mt-3">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0px 20px",
                        }}
                      >
                        <div style={{ padding: "20px" }}>
                          <Typography
                            variant="h4"
                            color="#223C7A"
                            component="div"
                          >
                            {ad.modelName}
                          </Typography>
                          <Typography color="text.secondary">
                            Price: {ad.price}
                          </Typography>
                          <Typography color="text.secondary">
                            Available in: {ad.city}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "0px 20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {ad.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                flex: "1",
                                marginBottom: "10px",
                                maxWidth: "calc(33.33% - 10px)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                style={{
                                  height: "80%",
                                  maxWidth: "80%",
                                  objectFit: "cover",
                                }}
                                image={`http://localhost:8080/${image.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={ad.modelName}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <CardContent>
                        <div style={{ padding: "0px 20px" }}>
                          <Typography variant="h6">Car Details</Typography>

                          <Typography color="text.secondary">
                            Mileage: {ad.mileage + " km"}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Capacity: {ad.engineCapacity + " cc"}
                          </Typography>
                          <Typography color="text.secondary">
                            Color: {ad.color}
                          </Typography>
                          <Typography color="text.secondary">
                            Transmission : {ad.transmission}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Type: {ad.engineType}
                          </Typography>
                          {ad.features.length > 0 && (
                            <div className="mt-3">
                              <Typography color="text.primary">
                                Features:
                              </Typography>
                              <ul>
                                {ad.features.map((feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    style={{ color: "green" }}
                                  >
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span
                            style={{
                              background: "#dc0530",
                              color: "#fff",
                              display: "inline-block",
                              borderRadius: "3px",
                              padding: ".2em .5em .3em",
                              fontSize: "1.2em",
                              fontWeight: "600",
                              margin: ".25em .1em",
                            }}
                          >
                            Removed
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {sortAds(removedAdsBike, sortBy).map((ad, index) => (
                    <Card key={index} className="mt-3">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0px 20px",
                        }}
                      >
                        <div style={{ padding: "20px" }}>
                          <Typography
                            variant="h4"
                            color="#223C7A"
                            component="div"
                          >
                            {ad.modelName}
                          </Typography>
                          <Typography color="text.secondary">
                            Price: {ad.price}
                          </Typography>
                          <Typography color="text.secondary">
                            Available in: {ad.city}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "0px 20px",
                            flexWrap: "wrap",
                          }}
                        >
                          {ad.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              style={{
                                marginRight: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                flex: "1",
                                marginBottom: "10px",
                                maxWidth: "calc(33.33% - 10px)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                style={{
                                  height: "80%",
                                  maxWidth: "80%",
                                  objectFit: "cover",
                                }}
                                image={`http://localhost:8080/${image.replace(
                                  /\\/g,
                                  "/"
                                )}`}
                                alt={ad.modelName}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <CardContent>
                        <div style={{ padding: "0px 20px" }}>
                          <Typography variant="h6">Bike Details</Typography>

                          <Typography color="text.secondary">
                            Mileage: {ad.mileage + " km"}
                          </Typography>
                          <Typography color="text.secondary">
                            Engine Capacity: {ad.engineCapacity + " cc"}
                          </Typography>
                          <Typography color="text.secondary">
                            Color: {ad.color}
                          </Typography>

                          <Typography color="text.secondary">
                            Engine Type: {ad.engineType}
                          </Typography>
                          {ad.features.length > 0 && (
                            <div className="mt-3">
                              <Typography color="text.primary">
                                Features:
                              </Typography>
                              <ul>
                                {ad.features.map((feature, featureIndex) => (
                                  <li
                                    key={featureIndex}
                                    style={{ color: "green" }}
                                  >
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span
                            style={{
                              background: "#dc0530",
                              color: "#fff",
                              display: "inline-block",
                              borderRadius: "3px",
                              padding: ".2em .5em .3em",
                              fontSize: "1.2em",
                              fontWeight: "600",
                              margin: ".25em .1em",
                            }}
                          >
                            Removed
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AllAdsPreview;
