import React from "react";
import "./SpecialOffers.css"; // Import CSS file for styling

function SpecialOffers() {
  const specialOffers = [
    "Offer 1",
    "Offer 2",
    "Offer 3",
    "Offer 4",
    "Offer 5",
    "Offer 6",
  ];

  return (
    <div className="special-offers-container">
      <h1 className="special-offers-heading">Autofinder Offering</h1>
      <div className="offer-buttons-container">
        {specialOffers.map((offer, index) => (
          <button key={index} className="offer-button">
            {offer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SpecialOffers;
