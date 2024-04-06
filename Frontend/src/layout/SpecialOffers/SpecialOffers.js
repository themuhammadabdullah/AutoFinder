import React from "react";
import "./SpecialOffers.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";

import freeAds from "../../assets/images/free_ads.png"; // Import the freeAds image
import premiumAds from "../../assets/images/premium_ads.png"; // Import the premiumAds image
import listForYou from "../../assets/images/list_it_for_you.png";
import Carinspection from "../../assets/images/car_inspection.png";
import RentCar from "../../assets/images/rent_car.png";
import BuyCarForMe from "../../assets/images/buy_car_for_me.png";

function SpecialOffers() {
  const navigate = useNavigate(); // Hook for navigation

  // Define your offerServices array with objects, removing the imageUrl properties
  const offerServices = [
    {
      id: 1,
      image: freeAds, // Directly use the imported image here
      title: "Free Ads",
      description: "Autofinder Services",
      link: "free-ad-service",
    },
    {
      id: 2,
      image: premiumAds, // Directly use the imported image here
      title: "Premium Ads",
      description: "Autofinder Services",
      link: "premium-ad-service",
    },
    {
      id: 3,
      image: listForYou, // Directly use the imported image here
      title: "List It For You",
      description: "Autofinder Services",
      link: "list-it-for-you",
    },
    {
      id: 4,
      image: Carinspection, // Directly use the imported image here
      title: "Car Inspection",
      description: "Autofinder Services",
      link: "car-inspection",
    },
    {
      id: 5,
      image: RentCar, // Directly use the imported image here
      title: "Rent A Car",
      description: "Autofinder Services",
      link: "rent-a-car",
    },
    {
      id: 6,
      image: BuyCarForMe, // Directly use the imported image here
      title: "Buy Car For Me",
      description: "Autofinder Services",
      link: "buy-car-for-me",
    },
    // The rest of your services...
  ];

  const handleCardClick = (serviceLink) => {
    navigate(`${serviceLink}`);
  };

  return (
    <div className="special-offers-container">
      <h1 className="special-offers-heading">Autofinder Offering</h1>
      <div className="offer-cards-container">
        {offerServices.map((service) => (
          <div
            key={service.id}
            className="offer-card"
            onClick={() => handleCardClick(service.link)}
          >
            <img
              src={service.image} // Use the directly assigned imported image
              alt={service.title}
              className="offer-image"
            />
            <h2>{service.description}</h2>
            <h4>{service.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpecialOffers;
