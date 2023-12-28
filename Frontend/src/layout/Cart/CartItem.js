//imports
import React from "react";

//material-ui
import {
  Button,
  Card,
  CardContent,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

//hooks
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//store
import { removeFromCart } from "../../store/cartSlice";
import { Activate } from "../../store/navbarSlice";

function CartItem() {
  const orders = useSelector((state) => state.cart.orders);
  const dispatch = useDispatch();

  const handleDeleteClick = (orderId) => {
    dispatch(removeFromCart(orderId));
  };

  const navigate = useNavigate();
  const navigateToAutostore = () => {
    dispatch(Activate({ user: "AutoStore" }));
    localStorage.setItem("ActiveTab", "AutoStore");
    navigate("/autostore");
  };
  const totalAmount = orders.reduce((acc, order) => {
    const price = parseFloat(order.price);
    if (!isNaN(price)) {
      return acc + price;
    }
    return acc;
  }, 0);

  return (
    <>
      {orders.length === 0 ? (
        <TableRow>
          <TableCell colSpan={orders.length} align="center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <Card
                style={{
                  width: "200px",
                  height: "100px",
                  margin: "8px",
                  border: "1px solid #EEEEEE",
                }}
              >
                <CardContent style={{ position: "relative" }}>
                  <Typography variant="body1">
                    Your cart is empty. Add some items!
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <TableCell>
                  <Card
                    style={{
                      width: "200px",
                      height: "25 0px",
                      margin: "8px",
                      border: "1px solid #EEEEEE",
                    }}
                  >
                    <CardContent style={{ position: "relative" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "80px",
                          width: "100px",
                          backgroundColor: "#f8f8f9",
                          margin: "1em auto",
                        }}
                      >
                        <img
                          src={`http://localhost:8080/${order.images?.[0]}`}
                          alt={order.name}
                          style={{
                            maxWidth: "150%",
                            maxHeight: "150%",
                            objectFit: "contain",
                            borderRadius: "1em",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#f8f8f9",
                          margin: "0 auto",
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            marginTop: "3vh",
                            textAlign: "center",
                          }}
                        >
                          {order.name.split(" ").slice(0, 3).join(" ")}{" "}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          PKR {order.price}
                        </Typography>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                        }}
                      >
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteClick(order._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </CardContent>
                  </Card>
                </TableCell>
              </React.Fragment>
            ))}
          </div>
        </TableRow>
      )}
      {orders.length !== 0 && (
        <TableRow>
          <TableCell colSpan={orders.length} align="right">
            <Button variant="contained" disabled style={{ color: "black" }}>
              Total Amount: {Math.floor(totalAmount)} PKR
            </Button>
          </TableCell>
        </TableRow>
      )}
      {orders.length === 0 && (
        <TableRow>
          <TableCell colSpan={orders.length} align="right">
            <Button
              variant="contained"
              onClick={navigateToAutostore}
              style={{ color: "white" }}
            >
              Explore Products
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default CartItem;
