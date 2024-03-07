import React from "react";
import { useParams } from "react-router-dom";
import inspimage from "../../assets/images/CarInspection.jpg";
// import "./SpecialOfferServices.css";

import one from "../../assets/images/number-1.png";
import two from "../../assets/images/number-2.png";
import three from "../../assets/images/number-3.png";

const PremiumAdService = () => {
  const { serviceId } = useParams(); // Destructure serviceId directly
  const id = parseInt(serviceId); // Parse the id to integer
  // const serviceData = [

  // ];

  const service = {
    id: 1,
    title: "Autofinder Premium Ads Service",
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
      <button className="button-post-ad">Post Ad</button>
      <h2>How AutoFinder Premium Ad Service Works?</h2>
      <div className="steps-container">
        <div className="step-item">
          <img src={one} alt="Step 1" />
          <p>Sign Up for Premium ad service</p>
        </div>
        <div className="step-item">
          <img src={two} alt="Step 2" />
          <p>Providing details about the vehicle you want to sell</p>
        </div>
        <div className="step-item">
          <img src={three} alt="Step 3" />
          <p>Your free ad will be displayed in the free ad area</p>
        </div>
        <div className="step-item">
          <img src={three} alt="Step 4" />
          <p>Interested buyer can contact the seller as well</p>
        </div>
      </div>
      <div className="note-paragraph">
        <h3>Note:</h3>
        <p>
          Autofinder offers premier ad placement for maximum exposure, ensuring
          your vehcile sells faster with 12 times the response rate of standard
          ads. Experience non-traditional advertising that extends visibility
          and provides ample space to showcase your listing.
        </p>
      </div>

      <h2>AutoFinder Services</h2>
      <div>
        <button className="button-post-ad">List it for you</button>

        <button className="button-post-ad">Boost your Ads</button>
        <button className="button-post-ad">Car Inspection</button>
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

export default PremiumAdService;
