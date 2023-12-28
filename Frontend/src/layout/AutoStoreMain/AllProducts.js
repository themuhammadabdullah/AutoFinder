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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

//hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector to access Redux state

//store
import { AddToCart } from "../../store/cartSlice";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

//carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function AllProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adsData, setAdsData] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 3;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = useSelector((state) => state.authentication.user);
  const orders = useSelector((state) => state.cart.orders);

  const handleOpenDialog = (ad) => {
    setSelectedAd(ad);
  };

  const handleCloseDialog = () => {
    setSelectedAd(null);
  };

  useEffect(() => {
    getAllAds();
    getAllCategories();
  }, []);

  const getAllAds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getProducts"
      );

      if (response.status === 200) {
        const approvedAds = response.data.products;

        approvedAds.sort((ad1, ad2) => {
          return new Date(ad2.createdAt.$date) - new Date(ad1.createdAt.$date);
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

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getCategory"
      );

      if (response.status === 200) {
        const categoriesData = response.data.categories;
        setCategories(categoriesData);
      } else {
        toast.error("Failed to load categories: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading categories error: " + error);
      toast.error("Failed to load categories: " + error.toString());
    }
  };

  const applyFilters = () => {
    let filteredData = adsData;

    if (selectedCategory) {
      filteredData = filteredData.filter(
        (ad) => ad.category === selectedCategory
      );
    }

    setFilteredAds(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleBuyNow = (ad) => {
    handleOpenDialog(ad);
  };

  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (orderId, newQuantity) => {
    setQuantities({
      ...quantities,
      [orderId]: newQuantity,
    });
  };
  const handleAdtoCart = (ad) => {
    if (!user) {
      toast.error("Log In First");
      return;
    }

    const existingProduct = orders.find((order) => order._id === ad._id);

    if (existingProduct) {
      const currentQuantity = quantities[ad._id] || 0;

      const newQuantity = currentQuantity + 1;

      setQuantities({
        ...quantities,
        [ad._id]: newQuantity,
      });
    } else {
      dispatch(AddToCart({ orders: ad }));
      setQuantities({
        ...quantities,
        [ad._id]: 1,
      });
    }

    toast.success("Added To Cart");
    handleCloseDialog();
  };

  useEffect(() => {
    console.log("Cart updated:", orders);
  }, [orders]);

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
                No products found. Try another category.
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
            key={ad._id}
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
                      src={`http://localhost:8080/${ad.images[0]}`}
                      alt={ad.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        cursor: "pointer",
                        maxHeight: "200px",
                        borderRadius: "0.5em",
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {ad.images.length} <ImageIcon />
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    marginLeft: "1em",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Typography
                      style={{ fontWeight: "bold", marginBottom: "2vh" }}
                      variant="h5"
                    >
                      {ad.name}
                    </Typography>
                    <Typography
                      style={{ marginBottom: "2vh" }}
                      color="text.secondary"
                    >
                      Description: {ad.description}
                    </Typography>
                  </div>
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
                  <Typography color="text.secondary">{ad.price} PKR</Typography>
                  <div style={{ marginTop: "auto" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        background: "#1976D2",
                        color: "#fff",
                        outline: "none",
                        border: "none",
                      }}
                      onClick={() => handleBuyNow(ad)}
                    >
                      Buy Now
                      <ShoppingCartIcon />
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
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          <Carousel showArrows={true}>
            {selectedAd.images.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:8080/${image}`}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: "20em", maxHeight: "20em" }}
                />
              </div>
            ))}
          </Carousel>
          <Typography variant="h6">{selectedAd.name}</Typography>
          <Typography color="text.secondary">
            Category: {selectedAd.category.$oid}
          </Typography>

          <Typography color="text.secondary">
            Description: {selectedAd.description}
          </Typography>
          <Typography variant="h6" style={{ marginTop: "1vh" }}>
            Price
          </Typography>
          <Typography color="text.secondary">{selectedAd.price} PKR</Typography>
          <div style={{ marginTop: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              style={{
                background: "#1976D2",
                color: "#fff",
                marginTop: "0.5em",
                outline: "none",
                border: "none",
              }}
              onClick={() => handleAdtoCart(selectedAd)}
            >
              Ad To Cart
              <ShoppingBasketIcon />
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
            getAllAds={getAllAds}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
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

export default AllProducts;
