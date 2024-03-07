import React from "react";
import { useParams } from "react-router-dom";
import inspimage from "../../assets/images/CarInspection.jpg";
// import "./SpecialOfferServices.css";

import reports from "../../assets/images/reports.png";
import staff from "../../assets/images/staff.png";
import inspection from "../../assets/images/inspection.png";

import one from "../../assets/images/number-1.png";
import two from "../../assets/images/number-2.png";
import three from "../../assets/images/number-3.png";

const ListItForYou = () => {
  const { serviceId } = useParams(); // Destructure serviceId directly
  const id = parseInt(serviceId); // Parse the id to integer
  // const serviceData = [

  // ];

  const service = {
    id: 1,
    title: "Autofinder List It For You",
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
      <button className="button-post-ad">Schedule List It For You</button>
      <h2>Why AutoFinder is best for List It For You</h2>
      <div className="steps-container">
        <div className="step-item">
          <img src={reports} alt="Step 1" />
          <p>Tension Free Service</p>
        </div>
        <div className="step-item">
          <img src={staff} alt="Step 2" />
          <p>Professional Sales Executive</p>
        </div>
        <div className="step-item">
          <img src={inspection} alt="Step 3" />
          <p>Your Car Your Price</p>
        </div>
        <div className="step-item">
          <img src={inspection} alt="Step 4" />
          <p>Peaceful Transaction of your moneyZ</p>
        </div>
      </div>
      <h2>How this will happen?</h2>
      <div className="steps-container">
        <div className="step-item">
          <img src={one} alt="Step 1" />
          <p>Sign Up for List it for you service</p>
        </div>
        <div className="step-item">
          <img src={two} alt="Step 2" />
          <p>Book a time and location for the listing service</p>
        </div>
        <div className="step-item">
          <img src={three} alt="Step 3" />
          <p>
            Team of experts will visit the vehcile owner and conduct the
            inspection.
          </p>
        </div>
        <div className="step-item">
          <img src={three} alt="Step 4" />
          <p>
            Your advertisement is prominently and promoted throughout the
            AutoFinder's webiste mobile app
          </p>
        </div>
      </div>
      <div className="note-paragraph">
        <h3>Note:</h3>
        <p>
          Our premium service includes professional photo capture, detailed
          inspections, and listing creation of AUtoFinder's platform. We handle
          all inquires, manage offers, and negotiate deals on your behalf. With
          us, you're guaranted a secure payment transfer after finalizing the
          deal. Sell hassle-free with Autofinder.
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

      <h2>Featured Ads</h2>
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
      </div>
    </div>
  );
};

export default ListItForYou;
