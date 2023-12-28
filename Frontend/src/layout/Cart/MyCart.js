//imports
import React from "react";
import Navbar from "../Navbar/Navbar";
import CartItem from "./CartItem";
import Footer from "../Footer/Footer";

//material-ui
import {
  Avatar,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

//hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//store
import { Activate, Deactivate } from "../../store/navbarSlice";

function MyCart() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart.orders);

  useEffect(() => {
    dispatch(Activate({ user: null }));
  }, []);

  const navigate = useNavigate();
  const navigateToAutostore = () => {
    dispatch(Activate({ user: "AutoStore" }));
    localStorage.setItem("ActiveTab", "AutoStore");
    navigate("/autostore");
  };

  const navigateToCheckout = () => {
    dispatch(Deactivate());
    localStorage.removeItem("ActiveTab");
    navigate("/checkout");
  };
  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1em",
          }}
        >
          <div
            style={{
              background: "#eee",
              borderRadius: "10px",
              padding: "20px",
              width: "60em",
              border: "4px solid #012E64",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Typography variant="h5">My Cart</Typography>
              <ShoppingCartIcon style={{ marginLeft: "10px" }} />
            </div>

            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <CartItem />
                </TableBody>
              </Table>
            </TableContainer>
            {orders.length !== 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={navigateToCheckout}
                >
                  Checkout
                </Button>
                <Button
                  variant="outlined"
                  onClick={navigateToAutostore}
                  color="primary"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "2em" }}>
        <Footer />
      </div>
    </>
  );
}

export default MyCart;
