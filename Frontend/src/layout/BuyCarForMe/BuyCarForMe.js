import React from "react";
import { useParams } from "react-router-dom";
import inspimage from "../../assets/images/CarInspection.jpg";
// import "./SpecialOfferServices.css";

import reports from "../../assets/images/reports.png";
import staff from "../../assets/images/staff.png";
import inspection from "../../assets/images/inspection.png";

import carUpper from "../../assets/images/carUpper.jpg";
import inspectionReport from "../../assets/images/inspectionReport.jpg";
import car from "../../assets/images/car.jpg";
import registration from "../../assets/images/Registration.png";

import one from "../../assets/images/number-1.png";
import two from "../../assets/images/number-2.png";
import three from "../../assets/images/number-3.png";

const BuyCarForMe = () => {
  const { serviceId } = useParams(); // Destructure serviceId directly
  const id = parseInt(serviceId); // Parse the id to integer
  // const serviceData = [

  // ];

  const service = {
    id: 1,
    title: "Autofinder Buy Car For Me",
    image: inspimage,
  }; // Use id here

  const Card = ({ image, itemName, price, cityName, modelName }) => (
    <div className="card">
      <img src={image} alt={itemName} className="card-image" />
      <h3>{itemName}</h3>
      <p>Price: {price}</p>
      <p>City: {cityName}</p>
      <p>Model: {modelName}</p>
    </div>
  );

  const managedAdsData = [
    {
      imageUrl: "managed-ad-image1.jpg",
      itemName: "Item 1",
      price: "$1000",
      cityName: "City A",
      modelName: "Model X",
    },
    {
      imageUrl: "managed-ad-image2.jpg",
      itemName: "Item 2",
      price: "$1500",
      cityName: "City B",
      modelName: "Model Y",
    },
    {
      imageUrl: "managed-ad-image1.jpg",
      itemName: "Item 1",
      price: "$1000",
      cityName: "City A",
      modelName: "Model X",
    },
    {
      imageUrl: "managed-ad-image2.jpg",
      itemName: "Item 2",
      price: "$1500",
      cityName: "City B",
      modelName: "Model Y",
    },
    {
      imageUrl: "managed-ad-image1.jpg",
      itemName: "Item 1",
      price: "$1000",
      cityName: "City A",
      modelName: "Model X",
    },
    {
      imageUrl: "managed-ad-image2.jpg",
      itemName: "Item 2",
      price: "$1500",
      cityName: "City B",
      modelName: "Model Y",
    },
    {
      imageUrl: "managed-ad-image1.jpg",
      itemName: "Item 1",
      price: "$1000",
      cityName: "City A",
      modelName: "Model X",
    },
    {
      imageUrl: "managed-ad-image2.jpg",
      itemName: "Item 2",
      price: "$1500",
      cityName: "City B",
      modelName: "Model Y",
    },
  ];

  const featuredAdsData = [
    {
      imageUrl: "featured-ad-image1.jpg",
      itemName: "Item A",
      price: "$2000",
      cityName: "City X",
      modelName: "Model P",
    },
    {
      imageUrl: "featured-ad-image2.jpg",
      itemName: "Item B",
      price: "$2500",
      cityName: "City Y",
      modelName: "Model Q",
    },
    {
      imageUrl: "featured-ad-image1.jpg",
      itemName: "Item A",
      price: "$2000",
      cityName: "City X",
      modelName: "Model P",
    },
    {
      imageUrl: "featured-ad-image2.jpg",
      itemName: "Item B",
      price: "$2500",
      cityName: "City Y",
      modelName: "Model Q",
    },
    {
      imageUrl: "featured-ad-image1.jpg",
      itemName: "Item A",
      price: "$2000",
      cityName: "City X",
      modelName: "Model P",
    },
    {
      imageUrl: "featured-ad-image2.jpg",
      itemName: "Item B",
      price: "$2500",
      cityName: "City Y",
      modelName: "Model Q",
    },
    {
      imageUrl: "featured-ad-image1.jpg",
      itemName: "Item A",
      price: "$2000",
      cityName: "City X",
      modelName: "Model P",
    },
    {
      imageUrl: "featured-ad-image2.jpg",
      itemName: "Item B",
      price: "$2500",
      cityName: "City Y",
      modelName: "Model Q",
    },
  ];

  const handleNextClickManaged = () => {
    scrollHandler(".managed-ads-container", true);
  };

  const handlePreviousClickManaged = () => {
    scrollHandler(".managed-ads-container", false);
  };

  const handleNextClickFeatured = () => {
    scrollHandler(".featured-ads-container", true);
  };

  const handlePreviousClickFeatured = () => {
    scrollHandler(".featured-ads-container", false);
  };

  const scrollHandler = (selector, isNext) => {
    const container = document.querySelector(selector);
    const scrollWidth = container.scrollWidth;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const newScrollPosition = isNext
      ? scrollLeft + clientWidth
      : scrollLeft - clientWidth;

    container.scrollTo({ left: newScrollPosition, behavior: "smooth" });
  };

  return (
    <div className="special-offer-services-container">
      <h1>{service.title}</h1>
      <img
        src={service.image}
        alt={service.title}
        className="service-main-image"
      />
      <h2>{service.title}</h2>
      <button className="button-post-ad">Facilitate My Car Purchase</button>
      <h2>Why AutoFinder is best to "Buy Car For You"?</h2>
      <div className="steps-container">
        <div className="step-item">
          <img src={reports} alt="Step 1" />
          <p>Personalized consultation</p>
        </div>
        <div className="step-item">
          <img src={staff} alt="Step 2" />
          <p>Extensive vehicle search</p>
        </div>
        <div className="step-item">
          <img src={inspection} alt="Step 3" />
          <p>Professional purchased executives</p>
        </div>
        <div className="step-item">
          <img src={inspection} alt="Step 3" />
          <p>Tension free service</p>
        </div>
      </div>
      <h2>How AutoFinder Buy Car For Me Service Works?</h2>
      <div className="steps-container">
        <div className="step-item">
          <img src={one} alt="Step 1" />
          <p>Sign Up for Buy Car For Me service</p>
        </div>
        <div className="step-item">
          <img src={two} alt="Step 2" />
          <p>
            Our team will promptly contact you to collect information for your
            desired future car
          </p>
        </div>
        <div className="step-item">
          <img src={three} alt="Step 3" />
          <p>
            You have to pay intial payment through different channels available
            at your convenience
          </p>
        </div>
      </div>

      <div className="note-paragraph">
        <h3>Summary</h3>
        <p>
          Exciting News! Our new "Buy Car For Me" service is here to streamline
          your car-buying journey. Simply share your preferences. Our dedicated
          team will not only find your car but also ensure its quality with a
          thorough inspection. Enjoy transparent pricing and let us negotiate
          the best deal for you. Experience a stress-less car buying experience
          with AutoFinder.
        </p>
      </div>

      <h2>Managed Ads By AutoFinder</h2>
      <div className="card-container managed-ads-container">
        {managedAdsData.map((ad, index) => (
          <Card key={index} {...ad} />
        ))}
      </div>
      <div className="navigation-wrapper">
        <div className="button-previous" onClick={handlePreviousClickManaged}>
          Previous
        </div>
        <div className="button-next" onClick={handleNextClickManaged}>
          Next
        </div>
      </div>

      {/* <h2>Featured Ads</h2>
      <div className="card-container featured-ads-container">
        {featuredAdsData.map((ad, index) => (
          <Card key={index} {...ad} />
        ))}
      </div>
      <div className="navigation-wrapper">
        <div className="button-previous" onClick={handlePreviousClickFeatured}>
          Previous
        </div>
        <div className="button-next" onClick={handleNextClickFeatured}>
          Next
        </div>
      </div> */}

      <div
        className="inspection-packages-section"
        style={{ textAlign: "center" }}
      >
        <h2>AutoFinder offering</h2>
        <div
          className="card-container inspection-packages-container"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {/* Card 1 */}
          <div
            className="card inspection-package-card"
            style={{
              width: "300px",
              height: "300px",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              transition: "0.3s",
              borderRadius: "5px",
              marginLeft: "200px",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
            <img
              src={registration}
              alt="Package 1"
              className="card-image"
              style={{
                width: "30%",
                height: "30%",
                marginBottom: "5px",
                marginTop: "20px",
              }}
            />
            <div className="card-content">
              <h3>AutoFinder Car Inspections</h3>
              <p>200+ point inspections for peace of mind</p>
              {/* <button
                className="button-view-details"
                style={{
                  backgroundColor: "#Ac3803",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button> */}
            </div>
          </div>
          {/* Card 2 */}
          <div
            className="card inspection-package-card"
            style={{
              width: "300px",
              height: "300px",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              transition: "0.3s",
              borderRadius: "5px",
              marginRight: "200px",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
            <img
              src={registration}
              alt="Package 2"
              className="card-image"
              style={{
                width: "30%",
                height: "30%",
                marginBottom: "5px",
                marginTop: "20px",
              }}
            />
            <div className="card-content">
              <h3>Auction Sheet Verifications</h3>
              <p>
                AutoFinder guarantees confidence with <br></br> verified
                Japenese car auction sheets.
              </p>
              {/* <button
                className="button-view-details"
                style={{
                  backgroundColor: "#Ac3803",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="sell-car-section" style={{ textAlign: "center" }}>
        <h2>Looking to Sell Your Car?</h2>
        <div className="note-paragraph">
          <h3>Sell today!</h3>
          <p>
            Place your add to uncover the best offer from our potential buyers.
          </p>
          <a href="/post-ad" className="post-ad-link">
            Post an Ad right away
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuyCarForMe;
