import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import "./NewCarsByMake.css"; // Import your CSS file for styling
import hondaLogo from "../../assets/car_make_images/honda.png";
import toyotaLogo from "../../assets/car_make_images/toyota.png";
import audiLogo from "../../assets/car_make_images/audi.png";
import bmwLogo from "../../assets/car_make_images/bmw.png";
import changanLogo from "../../assets/car_make_images/changan.png";
import cheryLogo from "../../assets/car_make_images/chery.png";
import chevroletLogo from "../../assets/car_make_images/chevrolet.png";
import daihatsuLogo from "../../assets/car_make_images/daihatsu.png";
import dfskLogo from "../../assets/car_make_images/dfsk.png";
import fawLogo from "../../assets/car_make_images/faw.png";
import havalLogo from "../../assets/car_make_images/haval.png";
import hyndaiLogo from "../../assets/car_make_images/hyndai.png";
import jeepLogo from "../../assets/car_make_images/jeep.png";
import knLogo from "../../assets/car_make_images/kn.png";
import lexuxLogo from "../../assets/car_make_images/lexus.png";
import mazdaLogo from "../../assets/car_make_images/mazda.png";
import mercedesLogo from "../../assets/car_make_images/mercedes.png";
import mgLogo from "../../assets/car_make_images/mg.png";
import mitsubishiLogo from "../../assets/car_make_images/mitsubishi.png";
import newlaunchLogo from "../../assets/car_make_images/newlaunch.jpg";
import nissanLogo from "../../assets/car_make_images/nissan.png";
import peueotLogo from "../../assets/car_make_images/peugeot.png";
import princeLogo from "../../assets/car_make_images/prince.png";
import protonLogo from "../../assets/car_make_images/proton.png";
import suzukiLogo from "../../assets/car_make_images/suzuki.png";
import CompaniesDescriptionPage from "../CompaniesDescriptionPage/CompaniesDescriptionPage.js"; // Import the description page component

const NewCarsByMake = () => {
  // Sample data of logos and their respective company names
  const logos = [
    { name: "Suzuki", image: suzukiLogo },
    { name: "Chevrolet", image: chevroletLogo },
    { name: "Daihatsu", image: daihatsuLogo },
    { name: "Toyota", image: toyotaLogo },
    { name: "Honda", image: hondaLogo },
    { name: "Jeep", image: jeepLogo },
    { name: "Hyundai", image: hyndaiLogo },
    { name: "Changan", image: changanLogo },
    { name: "MG", image: mgLogo },
    { name: "BMW", image: bmwLogo },
    { name: "Audi", image: audiLogo },
    { name: "Proton", image: protonLogo },
    { name: "KN", image: knLogo },
    { name: "Mitsubishi", image: mitsubishiLogo },
    { name: "Mercedes Benz", image: mercedesLogo },
    { name: "Prince", image: princeLogo },
    { name: "DFSK", image: dfskLogo },
    { name: "Lexus", image: lexuxLogo },
    { name: "FAW", image: fawLogo },
    { name: "Haval", image: havalLogo },
    { name: "Mazda", image: mazdaLogo },
    { name: "Peugeot", image: peueotLogo },
    { name: "New Launch", image: newlaunchLogo },
    { name: "Chery", image: cheryLogo },
    { name: "Nissan", image: nissanLogo },
    { name: "Daehan", image: hondaLogo },
    { name: "GUGO", image: toyotaLogo },
    { name: "Seres", image: hondaLogo },

    // Add more logos here...
  ];

  return (
    <div className="new-cars-by-make-container">
      <h1 className="page-title">New Cars By Make</h1>
      <div className="logos-grid">
        {logos.map((logo, index) => (
          <div className="logo-card" key={index}>
            <Link to="/companies-description" className="logo-link">
              {" "}
              {/* Use Link instead of anchor tag */}
              <img src={logo.image} alt={logo.name} className="logo-img" />
            </Link>
            <Link to="/companies-description" className="company-name">
              {" "}
              {/* Use Link instead of anchor tag */}
              {logo.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCarsByMake;
