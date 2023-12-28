import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import sedanImage from "../../assets/images/bodyStyles/sedan.jpg";
import coupeImage from "../../assets/images/bodyStyles/coupes.jpg";
import convertibleImage from "../../assets/images/bodyStyles/convertible.jpg";
import crossoverImage from "../../assets/images/bodyStyles/crossover.jpg";
import minivanImage from "../../assets/images/bodyStyles/minivan.jpg";
import SUVImage from "../../assets/images/bodyStyles/suv.jpg";
import truckImage from "../../assets/images/bodyStyles/truck.jpg";
import wagonImage from "../../assets/images/bodyStyles/wagon.jpg";

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
          Body Styles
        </Typography>
        <Grid container spacing={2}>
          {carStyles.map((carStyle, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Card style={{ minHeight: "200px" }}>
                {" "}
                {/* Ensure minimum card height */}
                <CardMedia
                  component="img"
                  alt={carStyle.altText}
                  height="140"
                  image={carStyle.imageUrl || carStyle.image}
                  title={carStyle.altText}
                  style={{ objectFit: "cover" }}
                />
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h5" style={{ color: "blue" }}>
                    {carStyle.title}
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: "14px" }}>
                    {carStyle.description}
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

// Replace placeholder data with your actual car style data
const carStyles = [
  {
    image: <img src={sedanImage} alt="Pickup image" />,
    altText: "Sedan",
    title: "Sedan",
    description: "Classic and comfortable",
  },
  {
    image: <img src={coupeImage} alt="Pickup image" />,
    altText: "Coupe",
    title: "Coupe",
    description: "Sporty and stylish",
  },
  {
    image: <img src={wagonImage} alt="Pickup image" />,
    altText: "Wagon",
    title: "Wagon",
    description: "Spacious and practical",
  },
  {
    image: <img src={convertibleImage} alt="Pickup image" />,
    altText: "Convertible",
    title: "Convertible",
    description: "Fun and open-air",
  },
  {
    image: <img src={truckImage} alt="Pickup image" />,
    altText: "Truck",
    title: "Truck",
    description: "Powerful and rugged",
  },
  {
    image: <img src={SUVImage} alt="Pickup image" />,
    altText: "SUV",
    title: "SUV",
    description: "Versatile and family-friendly",
  },
  {
    image: <img src={minivanImage} alt="Pickup image" />,
    altText: "Minivan",
    title: "Minivan",
    description: "Maximum passenger and cargo space",
  },
  {
    image: <img src={crossoverImage} alt="Pickup image" />,
    altText: "Crossover",
    title: "Crossover",
    description: "Blend of SUV and car features",
  },
];

export default BodyStyle;
