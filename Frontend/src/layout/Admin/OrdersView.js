//imports
import React, { useEffect, useState } from "react";

//material-ui
import { CircularProgress } from "@mui/material";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [allProducts, setAllProducts] = useState({});

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/getOrders");

      if (response.status === 200) {
        const { orders, products } = response.data;
        console.log("orders", orders);
        console.log("products", products);

        setOrders(orders);
        setIsLoading(false);
        preloadProductData(products);
        setAllProducts(products);
      } else {
        toast.error("Failed to load orders: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading orders error: " + error);
      toast.error("Failed to load orders: " + error.toString());
    }
  };

  const preloadProductData = (products) => {
    const productMap = {};
    for (const product of products) {
      productMap[product._id] = product;
    }
    setProducts(productMap);
  };
  const calculateTotalAmount = (order, products) => {
    let totalPrice = 0;

    for (const productObj of order.products) {
      const product = products.find((p) => p._id === productObj);

      if (product) {
        const productPrice = parseFloat(product.price);
        totalPrice += productPrice;
      }
    }

    totalPrice += 150;

    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const sortedOrders = [...orders].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleDispatchClick = async (order) => {
    console.log(order);
    try {
      const updatedOrders = orders.map((o) =>
        o._id === order._id ? { ...o, isDispatching: true } : o
      );
      setOrders(updatedOrders);

      const response = await axios.post(
        "http://localhost:8080/admin/dispatchOrder",
        {
          orderId: order._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Order Dispatched");
        const updatedOrders = orders.map((o) =>
          o._id === order._id ? { ...o, isDispatched: true } : o
        );
        setOrders(updatedOrders);
      } else {
        toast.error(response.data.message);
        const updatedOrders = orders.map((o) =>
          o._id === order._id ? { ...o, isDispatching: false } : o
        );
        setOrders(updatedOrders);
      }
    } catch (error) {
      // Display an error message and reset the dispatching state
      toast.error(error.toString());
      const updatedOrders = orders.map((o) =>
        o._id === order._id ? { ...o, isDispatching: false } : o
      );
      setOrders(updatedOrders);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "5em",
        marginBottom: "2em",
      }}
    >
      {isLoading ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
            width: "23.5em",
            backgroundColor: "white",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            textAlign: "center",
            minHeight: "20em",
          }}
        >
          <p>Loading orders...</p>
          <CircularProgress />
        </div>
      ) : (
        sortedOrders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              width: "23.5em",
              backgroundColor: "white",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              textAlign: "center",
              minHeight: "20em",
            }}
          >
            <h4>Order Details</h4>
            <ToastContainer />
            <table
              style={{ width: "22em", minHeight: "25em", maxHeight: "30em" }}
            >
              <tbody>
                <tr style={{ border: "1px solid grey" }}>
                  <td>Order ID:</td>
                  <td>{order._id}</td>
                </tr>
                <tr style={{ border: "1px solid grey" }}>
                  <td>Products:</td>
                  <td>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        {order.products.map((productId) => (
                          <tr key={productId}>
                            <td>{products[productId]?.name}</td>
                            <td>PKR {products[productId]?.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr style={{ border: "1px solid grey" }}>
                  <td>Shipping Charges:</td>
                  <td>150 PKR</td>
                </tr>
                <tr style={{ border: "1px solid grey" }}>
                  <td>Address:</td>
                  <td>{order.address}</td>
                </tr>
                <tr style={{ border: "1px solid grey" }}>
                  <td>Phone Number:</td>
                  <td>{order.phoneNumber}</td>
                </tr>
                <tr style={{ border: "1px solid grey" }}>
                  <td>Payment Mode:</td>
                  <td>{order.isPaid ? <p>Stripe</p> : <p>COD</p>}</td>
                </tr>
                <tr style={{ border: "1px solid grey" }}>
                  <td>Date:</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
                <tr style={{ border: "1px solid grey" }}>
                  <td>Time:</td>
                  <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                </tr>
                <tr style={{ border: "1px solid grey" }}>
                  <td>Total Price:</td>
                  <td>PKR {calculateTotalAmount(order, allProducts)}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    {order.isDispatched ? (
                      <button
                        style={{
                          backgroundColor: "lightgrey",
                          color: "black",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "default",
                          marginTop: "10px",
                        }}
                        disabled
                      >
                        On the way
                      </button>
                    ) : order.isDispatching ? (
                      <CircularProgress size={24} />
                    ) : (
                      <button
                        onClick={() => handleDispatchClick(order)}
                        style={{
                          backgroundColor: "#007bff",
                          color: "#fff",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                        Dispatch
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersView;
