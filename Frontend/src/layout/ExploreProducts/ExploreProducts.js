import React from "react";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import pickup from "../../assets/images/pickup.jpeg";

function ExploreProducts() {
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
          Discover Unique Vehicles
        </Typography>
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                <CardMedia
                  component="img"
                  alt={product.altText}
                  height="200"
                  image={product.imageUrl}
                  title={product.title}
                />
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

// Replace these image URLs with the ones you copy from Google
const products = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnN8ZW58MHx8MHx8fDA%3D",
    altText: "Image of a sleek sports car",
    title: "Conquer the Concrete Jungle",
    description: "Urban beast. Tames city streets, devours weekend adventures.",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz4KSXJDhufydTejqhPh_ehbO_n7OPUfdmJQ&usqp=CAU",
    altText: "Image of a sleek sports car",
    title: "Embrace the Open Road",
    description: "Open-air bliss. Feel the sun, conquer the open road.",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9lnaHnIsJ5QUoVgwts4eSJibGWYc309Nugw&usqp=CAU",
    altText: "Image of a sleek sports car",
    title: "Defy Expectations",
    description: "Future whispers. Electric power, heads turn, silence roars.",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhERHfLPJivEihBofpV7srogqfhq2SFMFgWA&usqp=CAU",
    altText: "Image of a sleek sports car",
    title: "Adventure Awaits",
    description: "Trails? Conquered. Beaches? Breezed. Adventure unlocked.",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsUKauu0R0XmV_24NjIG1-HslJ8rrISbeA1w&usqp=CAU",
    altText: "Image of a sleek sports car",
    title: "Thrilling Sports Cars",
    description: "Experience pure adrenaline behind the wheel.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnN8ZW58MHx8MHx8fDA%3D",
    altText: "Image of a sleek sports car",
    title: "Thrilling Sports Cars",
    description: "Experience pure adrenaline behind the wheel.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnN8ZW58MHx8MHx8fDA%3D",
    altText: "Image of a sleek sports car",
    title: "Thrilling Sports Cars",
    description: "Experience pure adrenaline behind the wheel.",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnN8ZW58MHx8MHx8fDA%3D",
    altText: "Image of a sleek sports car",
    title: "Thrilling Sports Cars",
    description: "Experience pure adrenaline behind the wheel.",
  },
  // Add more products with their image URLs, alt text, titles, and descriptions
];

export default ExploreProducts;
