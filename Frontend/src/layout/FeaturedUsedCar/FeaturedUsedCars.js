import React, { useRef } from "react";
import "./FeaturedUsedCars.css"; // Import CSS file for styling if needed

const FeaturedUsedCars = () => {
  const cardContainerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  // Dummy data for demonstration
  const cars = [
    {
      id: 1,
      image: "car1.jpg",
      name: "Toyota Corolla",
      price: "PKR 2,000,000",
      city: "Karachi",
    },
    {
      id: 2,
      image: "car2.jpg",
      name: "Honda Civic",
      price: "PKR 2,500,000",
      city: "Lahore",
    },
    {
      id: 3,
      image: "car3.jpg",
      name: "Suzuki Cultus",
      price: "PKR 1,200,000",
      city: "Islamabad",
    },
    {
      id: 4,
      image: "car4.jpg",
      name: "Kia Sportage",
      price: "PKR 3,000,000",
      city: "Rawalpindi",
    },
    // Add more dummy data as needed
  ];

  return (
    <div className="managed-by-pakwheels">
      <h2 className="section-title">Managed By Pak Wheels</h2>
      <div className="card-container" ref={cardContainerRef}>
        {cars.map((car) => (
          <div key={car.id} className="card">
            <img src={car.image} alt={car.name} className="car-image" />
            <div className="car-details">
              <h3 className="car-name">{car.name}</h3>
              <p className="car-price">{car.price}</p>
              <p className="car-city">{car.city}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button
          className="prev-button"
          onClick={() => handleScroll(-cardContainerRef.current.offsetWidth)}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={() => handleScroll(cardContainerRef.current.offsetWidth)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FeaturedUsedCars;
