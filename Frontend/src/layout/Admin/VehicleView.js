//imports
import React, { useEffect, useState } from "react";

//material-ui
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

function VehicleView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [carsAdsData, setCarsAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState(false);
  const [buttonText, setButtonText] = useState("Sort By Earliest");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getAdsData();
  }, [sortAscending]);

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
    setButtonText(sortAscending ? "Sort by Latest" : "Sort by Earliest");
  };

  const getAdsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getEveryAd"
      );

      if (response.status === 200) {
        let cars = response.data.cars;

        cars = cars.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return sortAscending ? dateA - dateB : dateB - dateA;
        });

        setCarsAdsData(cars);
        setLoading(false);
      } else {
        toast.error("Failed to load cars: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading cars error: " + error);
      toast.error("Failed to load cars: " + error.toString());
    }
  };

  const handleApproveAdClick = async (carId) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/approveAd",
        {
          carId: carId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Ad Approved Successfully");
          getAdsData();
        }, 2000);
      } else {
        toast.error("Failed to Approve Ad: " + response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Approving error: " + error);
      toast.error("Failed to Approve Ad User: " + error.toString());
      setIsLoading(false);
    }
  };

  const handleDisApproveAdClick = async (carId) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/DisApproveAd",
        {
          carId: carId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Ad DisApproved Successfully");
          getAdsData();
        }, 2000);
      } else {
        toast.error("Failed to DisApproved Ad: " + response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("DisApproved error: " + error);
      toast.error("Failed to DisApproved Ad User: " + error.toString());
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (carId) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/deleteAd",
        {
          carId: carId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Ad Deleted Successfully");
          getAdsData();
        }, 2000);
      } else {
        toast.error("Failed to Delete Ad: " + response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Deleting error: " + error);
      toast.error("Failed to Delete Ad User: " + error.toString());
      setIsLoading(false);
    }
  };

  function formatPrice(price) {
    if (typeof price !== "number" || isNaN(price)) {
      return "Invalid Price";
    }

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

  return (
    <>
      <div>
        <Button
          disabled
          variant="outlined"
          color="primary"
          style={{
            color: "#c50000",
            textAlign: "left",
            marginTop: "6em",
            marginLeft: "1em",
            border: "2px solid #c50000",
          }}
        >
          Car Ads Data
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={toggleSortOrder}
          style={{
            marginTop: "6em",
            marginLeft: "1em",
          }}
        >
          {buttonText}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minHeight: "80vh",
          width: "100%",
        }}
      >
        <div
          style={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            padding: "0em 0em",
          }}
        >
          <ToastContainer />
          <TableContainer
            component={Paper}
            style={{
              minWidth: "50em",
              background: "#F2F3F3",
              padding: "10px",
            }}
          >
            <Table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Model Name</TableCell>
                  <TableCell>Registered In</TableCell>
                  <TableCell>Model Year</TableCell>
                  <TableCell>Colour</TableCell>
                  <TableCell>Mileage</TableCell>
                  <TableCell>Engine Type</TableCell>
                  <TableCell>Transmission | Assembly</TableCell>
                  <TableCell>Features</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Images</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={14}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircularProgress size={24} />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  carsAdsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((car, index) => {
                      const registrationDate = new Date(car.createdAt);
                      const formattedDate = registrationDate.toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      );
                      const id = index + 1 + page * rowsPerPage;
                      return (
                        <TableRow key={car._id}>
                          <TableCell>{id}</TableCell>
                          <TableCell>{car.modelName}</TableCell>
                          <TableCell>{car.registeredIn}</TableCell>
                          <TableCell>{car.modelYear}</TableCell>
                          <TableCell>{car.color}</TableCell>
                          <TableCell>{car.mileage}</TableCell>
                          <TableCell>{car.engineType}</TableCell>
                          <TableCell>
                            {car.transmission} | {car.assembly}
                          </TableCell>
                          <TableCell>{car.features.join(", ")}</TableCell>
                          <TableCell>{car.sellerContact}</TableCell>
                          <TableCell>{formatPrice(car.price)}</TableCell>
                          <TableCell>{car.description}</TableCell>
                          <TableCell>
                            {car.images.map((image, imageIndex) => (
                              <Avatar
                                key={imageIndex}
                                alt={`Car Image ${imageIndex + 1}`}
                                src={`http://localhost:8080/${image}`}
                              />
                            ))}
                          </TableCell>

                          {car.isApproved === null ? (
                            <TableCell>
                              <div>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => handleApproveAdClick(car._id)}
                                  style={{
                                    border: "2px solid green",
                                    borderRadius: "3em",
                                    background: "green",
                                    color: "white",
                                    width: "6px",
                                    height: "25px",
                                    fontSize: "12px",
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  style={{
                                    border: "2px solid red",
                                    borderRadius: "3em",
                                    background: "red",
                                    color: "white",
                                    height: "25px",
                                    fontSize: "12px",
                                    marginTop:"1em"
                                  }}
                                  onClick={() =>
                                    handleDisApproveAdClick(car._id)
                                  }
                                >
                                  Disapprove
                                </Button>
                              </div>
                            </TableCell>
                          ) : car.isApproved === false ? (
                            <TableCell>
                              <div>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => handleDeleteClick(car._id)}
                                  disabled
                                  style={{
                                    border: "2px solid yellow",
                                    borderRadius: "3em",
                                    background: "yellow",
                                    color: "black",
                                    width: "8px",
                                    height: "25px",
                                    fontSize: "11px",
                                  }}
                                >
                                  Removed
                                </Button>
                              </div>
                            </TableCell>
                          ) : (
                            <TableCell>
                              <div>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => handleDeleteClick(car._id)}
                                  style={{
                                    border: "2px solid red",
                                    borderRadius: "3em",
                                    background: "red",
                                    color: "white",
                                    width: "5px",
                                    height: "25px",
                                    fontSize: "12px",
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[4, 8, 20]}
            component="div"
            count={carsAdsData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ marginBottom: "1em" }}
          />
        </div>
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
    </>
  );
}

export default VehicleView;
