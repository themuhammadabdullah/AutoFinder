//imports
import React, { useState } from "react";

//material-ui
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  Button,
  TextField,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//store
import {
  clearCart,
  isCartEmpty,
  orderToBeUpdated,
} from "../../store/cartSlice";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

//stripe
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

//styles
const cardOptions = {
  base: {
    iconColor: "#c4f0ff",
    color: "#fff",
    fontWeight: 500,
    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    fontSize: "16px",
    fontSmoothing: "antialiased",
    ":-webkit-autofill": { color: "#fce883" },
    "::placeholder": { color: "#87bbfd" },
  },
  invalid: {
    iconColor: "#ffc7ee",
    color: "#ffc7ee",
  },
};

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

export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const user = useSelector((state) => state.authentication.user);
  const orders = useSelector((state) => state.cart.orders);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const totalAmount = orders.reduce((acc, order) => {
    const price = parseFloat(order.price);
    if (!isNaN(price)) {
      return acc + price + 150;
    }
    return acc;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phonePattern = /^03\d{9}$/;
    const isPhoneValid = phonePattern.test(phoneNumber);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(phoneNumber);

    const numbersOnlyRegex = /^\d+$/;
    const specialCharactersOnlyRegex = /^[!@#$%^&*(),.?":{}|<>]+$/;

    if (address.trim() === "") {
      return alert("Invalid Address");
    } else if (
      numbersOnlyRegex.test(address) ||
      specialCharactersOnlyRegex.test(address)
    ) {
      return alert("Invalid Address");
    } else if (!isPhoneValid) {
      return setPhoneNumberValid(false);
    } else if (hasSpecialCharacters) {
      return alert(
        "Invalid Phone Number. It should not contain special characters."
      );
    }
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(phoneNumber, address);
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8080/admin/userStripeOrder",
          {
            amount: totalAmount,
            id,
            user,
            orders,
            phoneNumber,
            address,
          }
        );
        console.log("Response from server:", response);

        if (response.data.success) {
          const savedOrder = response.data.savedOrder;
          dispatch(clearCart());
          dispatch(isCartEmpty());
          toast.success("Payment Successfull");
          setSuccess(true);
          props.setPaymentSuccess(true);

          setTimeout(() => {
            setIsOrderPlaced(true);

            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        setPaymentFailed(true);
        toast.error(error);
        setLoading(false);
      }
    } else {
      setPaymentFailed(true);
      toast.error(error.message);
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const navigateToMyOrders = () => {
    navigate("/my-orders");
  };

  return (
    <>
      {!success ? (
        <>
          <form style={{ marginTop: "5vh" }} onSubmit={handleSubmit}>
            <ToastContainer />
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
            <fieldset style={{ marginTop: "1.5em" }}>
              <CardElement options={cardOptions} />
            </fieldset>
            {!isOrderPlaced && (
              <div>
                <form>
                  <Button
                    variant="contained"
                    style={{
                      outline: "none",
                      fontSize: "14px",
                      textTransform: "none",
                      background: "transparent",
                      marginTop: "3em",
                    }}
                    color="primary"
                    disabled
                  >
                    Enter Details for Receiving Order
                  </Button>
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
                </form>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                <button style={buttonStyles} disabled={loading}>
                  Pay
                </button>
              )}
            </div>
          </form>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert severity="success">Your Order is Placed.</Alert>
          <Button onClick={navigateToMyOrders}>See My Orders</Button>
          <button style={buttonStyles} disabled>
            <CheckCircleIcon />
          </button>
        </div>
      )}
    </>
  );
}
