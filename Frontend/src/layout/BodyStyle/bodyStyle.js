import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import pickup from "../../assets/images/pickup.jpeg";
import coupeImage from "../../assets/images/bodyStyles/coupes.jpg";
import WagonImg from "../../assets/images/bodyStyles/wagon.jpg";
import BackgroundImage from "../../assets/images/musti1.webp";

function BodyStyle() {
  return (
    <div style={{ marginTop: "10em" }}>
      <div className="container" style={{ padding: "10px 0px" }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontWeight="bold"
          padding="20px"
        >
          Explore Products by Auto Finder
        </Typography>
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  borderRadius:
                    "10px" /* Add rounded corners for a softer look */,
                  boxShadow:
                    "0 10px 20px rgba(0, 0, 0, 0.3)" /* Increase shadow depth and size */,
                  transition: "transform 0.3s",
                  height: "300px",
                }}
              >
                <div className="img">
                  <img
                    alt={product.altText}
                    src={product.imageUrl || pickup}
                    title={product.altText}
                    width="150"
                    height="100"
                    style={{ margin: "5px 0", objectFit: "cover" }}
                  />
                </div>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h5" style={{ color: "blue" }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: "14px" }}>
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

const products = [
  {},
  {
    image: <img src={coupeImage} alt="Pickup image" />,
    title: "Under 1000$ dollar",
    description: "Pickup Trucks under $1,000",
  },
  {
    image: <img src={pickup} alt="Pickup image" />,
    title: "Under 1000$ dollar",
    description: "Pickup Trucks under $1,000",
  },
  {
    image: <img src={pickup} alt="Pickup image" />,
    title: "Under 1000$ dollar",
    description: "Pickup Trucks under $1,000",
  },
  {
    image: <img src={pickup} alt="Pickup image" />,
    title: "Under 1000$ dollar",
    description: "Pickup Trucks under $1,000",
  },
  {
    image: <img src={pickup} alt="Pickup image" />,
    title: "Under 1000$ dollar",
    description: "Pickup Trucks under $1,000",
  },
];

export default BodyStyle;
