import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarImage1 from "../../assets/images/newcar1.jpg"; // Import images from your local directory

const FeaturedNewCars_UpcomingCars = () => {
  // Sample data for demonstration
  const carsData = [
    {
      id: 1,
      name: "Car 1",
      image: CarImage1,
      price: "$30,000",
      reviews: 15,
    },
    {
      id: 2,
      name: "Car 2",
      image: CarImage1,
      price: "$40,000",
      reviews: 20,
    },
    {
      id: 3,
      name: "Car 3",
      image: CarImage1,
      price: "$35,000",
      reviews: 18,
    },
    {
      id: 1,
      name: "Car 1",
      image: CarImage1,
      price: "$30,000",
      reviews: 15,
    },
    {
      id: 2,
      name: "Car 2",
      image: CarImage1,
      price: "$40,000",
      reviews: 20,
    },
    {
      id: 3,
      name: "Car 3",
      image: CarImage1,
      price: "$35,000",
      reviews: 18,
    },
    {
      id: 1,
      name: "Car 1",
      image: CarImage1,
      price: "$30,000",
      reviews: 15,
    },
    {
      id: 2,
      name: "Car 2",
      image: CarImage1,
      price: "$40,000",
      reviews: 20,
    },
    {
      id: 3,
      name: "Car 3",
      image: CarImage1,
      price: "$35,000",
      reviews: 18,
    },
    // Add more cars data as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of cards to show at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {carsData.map((car) => (
        <div key={car.id}>
          <Card sx={{ width: 250, marginTop: 3 }}>
            {" "}
            {/* Adjust card width */}
            <CardMedia
              component="img"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }} // Adjust image dimensions
              image={car.image} // Use the imported image directly
              alt={car.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {car.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {car.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reviews: {car.reviews}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </Slider>
  );
};

export default FeaturedNewCars_UpcomingCars;
