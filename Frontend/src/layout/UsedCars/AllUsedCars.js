//imports
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SearchFilters from "./SearchFilters";

//material-ui
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Pagination,
  CircularProgress,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

//hooks
import { useNavigate, useLocation } from "react-router-dom";

//axios
import axios from "axios";

//toastify
import { toast } from "react-toastify";

//carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function AllUsedCars() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adsData, setAdsData] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const queryParams = new URLSearchParams(location.search);

  const city = queryParams.get("city");
  const price = queryParams.get("price");
  const engineCapacity = queryParams.get("engineCapacity");

  const [filterOptions, setFilterOptions] = useState({
    city: queryParams.get("city") || "",
    province: "",
    engineCapacity: queryParams.get("engineCapacity") || "",
    transmission: "",
    color: "",
    price: queryParams.get("price") || "",
  });

  const [selectedAd, setSelectedAd] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 3;
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenDialog = (ad) => {
    setSelectedAd(ad);
  };

  const handleCloseDialog = () => {
    setSelectedAd(null);
  };

  useEffect(() => {
    getAllAds();
  }, []);

  const getAllAds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getEveryAd"
      );

      if (response.status === 200) {
        const ads = response.data.cars;

        const approvedAds = ads.filter((ad) => ad.isApproved);

        approvedAds.sort((ad1, ad2) => {
          return new Date(ad2.createdAt) - new Date(ad1.createdAt);
        });

        setAdsData(approvedAds);
        setFilteredAds(approvedAds);
      } else {
        toast.error("Failed to load ads: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading ads error: " + error);
      toast.error("Failed to load ads: " + error.toString());
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const applyFilters = () => {
    let filteredData = adsData.slice();

    if (filterOptions.city) {
      filteredData = filteredData.filter(
        (ad) => ad.city === filterOptions.city
      );
    }
    if (filterOptions.engineCapacity) {
      filteredData = filteredData.filter(
        (ad) => ad.engineCapacity === filterOptions.engineCapacity
      );
    }
    if (filterOptions.transmission) {
      filteredData = filteredData.filter(
        (ad) => ad.transmission === filterOptions.transmission
      );
    }
    if (filterOptions.color) {
      filteredData = filteredData.filter(
        (ad) => ad.color === filterOptions.color
      );
    }

    if (filterOptions.province) {
      filteredData = filteredData.filter(
        (ad) => ad.registeredIn === filterOptions.province
      );
    }

    if (filterOptions.modelYear) {
      filteredData = filteredData.filter(
        (ad) => ad.modelYear === filterOptions.modelYear
      );
    }
    if (filterOptions.price) {
      const [minPrice, maxPrice] = filterOptions.price.split("-");

      filteredData = filteredData.filter((ad) => {
        const adPrice = ad.price.toString();

        return (
          parseFloat(adPrice.replace(/,/g, "")) >=
            parseFloat(minPrice) * 100000 &&
          parseFloat(adPrice.replace(/,/g, "")) <= parseFloat(maxPrice) * 100000
        );
      });
    }

    setFilteredAds(filteredData);
  };
  useEffect(() => {
    if (adsData.length > 0) {
      applyFilters();
    }
  }, [adsData, filterOptions]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  function formatPrice(price) {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(2) + " Crores";
    } else if (price >= 100000) {
      return (price / 100000).toFixed(2) + " Lacs";
    } else if (price >= 1000) {
      return (price / 1000).toFixed(2) + " Thousands";
    } else {
      return price.toFixed(2) + " PKR";
    }
  }

  const renderAds = () => {
    const startIndex = (currentPage - 1) * adsPerPage;
    const endIndex = startIndex + adsPerPage;

    const adsToDisplay = filteredAds.slice(startIndex, endIndex);

    if (adsToDisplay.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5em 20em",
          }}
        >
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2em",
              textAlign: "center",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1696856261~exp=1696856861~hmac=d9b86916a3389166d173a357ba600d17c2f1eee6fc61656f7701a2ac64966404"
              alt="No Data"
              style={{ maxWidth: "100px" }}
            />
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", margin: "1em" }}
            >
              Results Not Found
            </Typography>
            <div>
              <Typography variant="h6">
                No ads found. Try another filter combination.
              </Typography>
            </div>
          </Card>
        </div>
      );
    }
    return (
      <div>
        {adsToDisplay.map((ad) => (
          <Card
            key={ad._id.$oid}
            style={{
              marginBottom: "20px",
              padding: "1em",
              margin: "1em",
              width: "60em",
              border: "3px solid #F2F3F3",
            }}
          >
            <CardContent>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 1 }}>
                  <div>
                    <img
                      src={`http://localhost:8080/${ad.images[0].replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={ad.modelName}
                      style={{
                        width: "100%",
                        height: "auto",
                        cursor: "pointer",
                        maxHeight: "200px",
                        borderRadius: "0.5em", // Reduce the image size
                      }}
                      onClick={() => handleOpenDialog(ad)}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {ad.images.length} <ImageIcon />
                  </div>
                </div>
                <div style={{ flex: 1, marginLeft: "1em" }}>
                  <Typography variant="h6">{ad.modelName}</Typography>
                  <Typography color="text.secondary">
                    Available In: {ad.city}
                  </Typography>
                  <Typography color="text.secondary">
                    Registered In: {ad.registeredIn}
                  </Typography>
                  <Typography color="text.secondary">
                    Year: {ad.modelYear}
                  </Typography>
                  <Typography color="text.secondary">
                    Color: {ad.color}
                  </Typography>
                  <Typography color="text.secondary">
                    Mileage: {ad.mileage} km
                  </Typography>
                  <Typography color="text.secondary">
                    Transmission: {ad.transmission}
                  </Typography>
                  <Typography color="text.secondary">
                    Assembly: {ad.assembly}
                  </Typography>
                  <Typography color="text.secondary">
                    Engine Capacity: {ad.engineCapacity}
                  </Typography>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography variant="h6">Price</Typography>
                  <Typography color="text.secondary">
                    {formatPrice(ad.price)}
                  </Typography>

                  <div style={{ marginTop: "auto" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ background: "#1976D2", color: "#fff" }}
                      disabled
                    >
                      Contact: {ad.sellerContact}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(filteredAds.length / adsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    );
  };

  const renderImageSliderDialog = () => {
    if (!selectedAd) {
      return null;
    }

    return (
      <Dialog open={!!selectedAd} onClose={handleCloseDialog} maxWidth="lg">
        <DialogTitle>Car Details</DialogTitle>
        <DialogContent>
          <Carousel showArrows={true}>
            {selectedAd.images.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:8080/${image.replace(/\\/g, "/")}`}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: "20em", maxHeight: "20em" }}
                />
              </div>
            ))}
          </Carousel>
          <Typography variant="h6">{selectedAd.modelName}</Typography>
          <Typography color="text.secondary">
            Available In: {selectedAd.city}
          </Typography>
          <Typography color="text.secondary">
            Registered In: {selectedAd.registeredIn}
          </Typography>
          <Typography color="text.secondary">
            Year: {selectedAd.modelYear}
          </Typography>
          <Typography color="text.secondary">
            Color: {selectedAd.color}
          </Typography>
          <Typography color="text.secondary">
            Mileage: {selectedAd.mileage} km
          </Typography>
          <Typography color="text.secondary">
            Transmission: {selectedAd.transmission}
          </Typography>
          <Typography color="text.secondary">
            Assembly: {selectedAd.assembly}
          </Typography>
          <Typography color="text.secondary">
            Engine Capacity: {selectedAd.engineCapacity}
          </Typography>
          <Typography variant="h6">Price</Typography>
          <Typography color="text.secondary">
            {formatPrice(selectedAd.price)}
          </Typography>
          <div style={{ flex: 1 }}>
            {selectedAd.features.length > 0 && (
              <div className="mt-3">
                <Typography color="text.primary">Features:</Typography>
                <ul>
                  {selectedAd.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{ color: "green" }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div style={{ marginTop: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ background: "#1976D2", color: "#fff" }}
              disabled
            >
              Contact: {selectedAd.sellerContact}
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleCloseDialog}>Close</IconButton>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <Navbar />

      <div style={{ display: "flex", margin: "1em" }}>
        <div>
          <SearchFilters
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>
        {isLoading ? (
          <CircularProgress style={{ margin: "auto" }} />
        ) : (
          <div>{renderAds()}</div>
        )}
      </div>
      {renderImageSliderDialog()}
    </div>
  );
}

export default AllUsedCars;
