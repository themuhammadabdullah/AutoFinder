import React from "react";
import { Link } from "react-router-dom";
import "./NewCarsByMake.css"; // Import your CSS file for styling

const NewCarsByMake = () => {
  // Sample data of logos and their respective company names
  const logos = [
    { name: "Honda", imgUrl: "honda_logo.png", link: "/honda" },
    { name: "Toyota", imgUrl: "honda_logo.png", link: "/honda" },
    // Add more logos here...
  ];

  return (
    <div className="new-cars-by-make-container">
      <h1>New Cars By Make</h1>
      <div className="logos-grid">
        {logos.map((logo, index) => (
          <div className="logo-card" key={index}>
            <Link to={logo.link}>
              <img src={logo.imgUrl} alt={logo.name} className="logo-img" />
              <p className="logo-name">{logo.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCarsByMake;
