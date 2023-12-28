//imports
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import StripeContainer from "./StripeContainer";

//material-ui
import {
  Button,
  TextField,
  Typography,
  CardContent,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DescriptionIcon from "@mui/icons-material/Description";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//store
import { clearCart } from "../../store/cartSlice";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

const buttonStyles = {
  marginTop: "3em",
  display: "block",
  fontSize: "16px",
  width: "50%",
  height: "40px",
  margin: "40px 15px 0",
  backgroundColor: "#f6a4eb",
  boxShadow:
    "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ffb9f6",
  borderRadius: "4px",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 100ms ease-in-out",
  willChange: "transform, background-color, box-shadow",
  border: "none",
};

function CheckoutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const user = useSelector((state) => state.authentication.user);
  const orders = useSelector((state) => state.cart.orders);
  const isCartEmpty = useSelector((state) => state.cart.Yes);

  const dispatch = useDispatch();
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const navigate = useNavigate();
  const navigateToMyOrders = () => {
    navigate("/my-orders");
  };
  const handleFinishOrder = async () => {
    setIsProcessing(true);

    const phonePattern = /^03\d{9}$/;
    const isPhoneValid = phonePattern.test(phoneNumber);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(phoneNumber);

    if (address === "") {
      alert("Invalid Address");
      setIsProcessing(false);
    } else if (!isPhoneValid) {
      setPhoneNumberValid(false);
      setIsProcessing(false);
    } else if (hasSpecialCharacters) {
      alert("Invalid Phone Number. It should not contain special characters.");
      setIsProcessing(false);
    } else {
      try {
        console.log(orders);

        const response = await axios.post(
          "http://localhost:8080/admin/userCODOrder",
          {
            user: user,
            products: orders,
            address: address,
            phoneNumber: phoneNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          toast.success("Order Placed");
          dispatch(clearCart());

          setIsOrderPlaced(true);
          setPhoneNumberValid(true);
          setPaymentSuccess(true);
        }
      } catch (error) {
        console.error("Error placing COD order:", error);
        setIsProcessing(false);
        alert("Error placing the order. Please try again later.");
      }
    }
  };
  const totalAmount = orders.reduce((acc, order) => {
    const price = parseFloat(order.price);
    if (!isNaN(price)) {
      return acc + price + 150;
    }
    return acc;
  }, 0);
  const renderPaymentContent = () => {
    if (selectedPaymentMethod === "stripe") {
      return (
        <div>
          <StripeContainer setPaymentSuccess={setPaymentSuccess} />
        </div>
      );
    } else if (selectedPaymentMethod === "cod") {
      return (
        <>
          {!isOrderPlaced && (
            <div
              style={{
                border: "2px solid grey",
                borderRadius: "1em",
                padding: "1em",
                marginTop: "1em",
              }}
            >
              {orders.map((order, index) => {
                const { name, price, quantity } = order;
                const parsedPrice = parseFloat(price);
                const productTotal = parsedPrice * quantity;
                return (
                  <div key={order._id} style={{ marginTop: "0.5em" }}>
                    <Typography variant="subtitle1">
                      ✔ {name}
                      {parsedPrice} PKR
                    </Typography>
                  </div>
                );
              })}

              <Typography variant="body1" style={{ marginTop: "0.5em" }}>
                Shipping: 150 PKR
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ fontWeight: "bold", marginTop: "0.5em" }}
              >
                Total:{totalAmount} PKR
              </Typography>
            </div>
          )}
          {!isOrderPlaced && (
            <div>
              <ToastContainer />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                margin="normal"
                required
                error={!phoneNumberValid}
                helperText={!phoneNumberValid ? "Invalid Phone Number" : ""}
              />
            </div>
          )}
          {isOrderPlaced && (
            <div>
              <Alert severity="success">Your Order is Placed.</Alert>
              <Button onClick={navigateToMyOrders}>See My Orders</Button>
            </div>
          )}

          {orders.length > 0 && !isOrderPlaced && <div></div>}
        </>
      );
    }
  };

  const renderFinishButton = () => {
    if (isOrderPlaced) {
      return <DoneIcon style={{ color: "green" }} />;
    } else if (isProcessing) {
      return <CircularProgress size={24} />;
    } else if (selectedPaymentMethod === "cod") {
      return (
        <Button
          variant="contained"
          style={buttonStyles}
          color="primary"
          onClick={handleFinishOrder}
        >
          Finish Order
        </Button>
      );
    } else {
      return;
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "70vh", marginTop: 20 }}>
          <CardContent>
            <Typography variant="h6">
              Checkout
              <span>
                <DescriptionIcon />
              </span>
            </Typography>
            {paymentSuccess ? null : (
              <>
                <Button
                  variant={
                    selectedPaymentMethod === "stripe"
                      ? "contained"
                      : "outlined"
                  }
                  color="primary"
                  style={{ marginRight: 10, outline: "none" }}
                  onClick={() => handlePaymentMethodChange("stripe")}
                >
                  Card
                </Button>
                <Button
                  variant={
                    selectedPaymentMethod === "cod" ? "contained" : "outlined"
                  }
                  color="primary"
                  style={{ outline: "none" }}
                  onClick={() => handlePaymentMethodChange("cod")}
                >
                  Cash on Delivery
                </Button>
              </>
            )}

            {renderPaymentContent()}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              {renderFinishButton()}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default CheckoutPage;
