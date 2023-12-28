//imports
import React from "react";

//material-ui
import { Button, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

//hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//store
import { clearCart } from "../../store/cartSlice";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

function FinishStripeOrder() {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const user = useSelector((state) => state.authentication.user);
  const orders = useSelector((state) => state.cart.orders);
  console.log("updated order", orders);
  const handleFinishOrder = async () => {
    setIsProcessing(true);

    const phonePattern = /^03\d{9}$/;
    const isPhoneValid = phonePattern.test(phoneNumber);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(phoneNumber);

    if (address === "") {
      return alert("Invalid Address");
      setIsProcessing(false);
    } else if (!isPhoneValid) {
      return setPhoneNumberValid(false);
      setIsProcessing(false);
    } else if (hasSpecialCharacters) {
      return alert(
        "Invalid Phone Number. It should not contain special characters."
      );
      setIsProcessing(false);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/admin/updateStripeOrder",
          {
            order: orders,
            address: address,
            phoneNumber: phoneNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          dispatch(clearCart());
          const updatedOrder = response.data.updatedOrder;
          console.log(updatedOrder);
          setIsOrderPlaced(true);
          setPhoneNumberValid(true);
          toast.success("Error placing the order. Please try again later.");
        }
      } catch (error) {
        console.error("Error placing COD order:", error);
        setIsProcessing(false);
        toast.error("Error placing the order. Please try again later.");
      }
    }
  };

  return (
    <div>
      {!isOrderPlaced ? (
        <div>
          <form>
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
            <ToastContainer />
            <Button
              variant="contained"
              style={{ outline: "none" }}
              color="primary"
              onClick={handleFinishOrder}
            >
              Finish Order
            </Button>
          </form>
        </div>
      ) : (
        <CheckCircleIcon />
      )}
    </div>
  );
}

export default FinishStripeOrder;
