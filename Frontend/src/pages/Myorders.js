//imports
import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import MyOrdersPofile from "../layout/MyOrders/MyOrdersPofile";

//axios
import axios from "axios";

//hooks
import { useDispatch, useSelector } from "react-redux";

//store
import { Activate } from "../store/navbarSlice";

//toastify
import { toast } from "react-toastify";

//material-ui
import { Typography } from "@mui/material";

function Myorders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const [orders, setOrders] = useState([]);

  const getOrdersForUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/getAllOrders",
        {
          userId: user._id,
        }
      );

      if (response.status === 200) {
        const ordersData = response.data.orders;
        setOrders(ordersData);
        console.log(ordersData);
      } else {
        toast.error("Failed to load orders: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading orders error: " + error);
      toast.error("Failed to load orders: " + error.toString());
    }
  };

  useEffect(() => {
    dispatch(Activate({ user: null }));
    getOrdersForUser();
  }, []);

  const groupOrdersIntoRows = (orders) => {
    const rows = [];
    for (let i = 0; i < orders.length; i += 3) {
      rows.push(orders.slice(i, i + 3));
    }
    return rows;
  };

  const calculateTotalPrice = (order) => {
    return order.products.reduce((total, product) => {
      return total + parseFloat(product.price) + 150;
    }, 0);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <MyOrdersPofile />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#F2F3F3",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          {groupOrdersIntoRows(sortedOrders).map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "20px",
              }}
            >
              {row.map((order) => (
                <div
                  key={order._id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    width: "20em",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                    textAlign: "center",
                    margin: "1em",
                  }}
                >
                  <h4>Products</h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {order.products.map((product) => (
                      <li key={product._id}>
                        {product.name} - PKR {product.price}
                      </li>
                    ))}
                  </ul>
                  <p>Shipping Charges: 150</p>

                  <p>Total Price: PKR {calculateTotalPrice(order)}</p>
                  <p>Address: {order.address}</p>
                  <p>Phone Number: {order.phoneNumber}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p>Time: {new Date(order.createdAt).toLocaleTimeString()}</p>
                  <button disabled>Order ID: {order._id}</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {orders.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2em",
              textAlign: "center",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-2566.jpg?w=740&t=st=1696865593~exp=1696866193~hmac=9310d5941f28779f4e54176cd933eb28e3f3b2a90e7978776a9e0ca2eb1bd840"
              alt="No Data"
              style={{ maxWidth: "200px" }}
            />
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", margin: "1em" }}
            >
              You Haven't Ordered Anything!
            </Typography>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Myorders;
