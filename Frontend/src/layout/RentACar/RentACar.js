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

import one from "../../assets/images/number-1.png";
import two from "../../assets/images/number-2.png";
import three from "../../assets/images/number-3.png";

const RentACar = () => {
  const { serviceId } = useParams(); // Destructure serviceId directly
  const id = parseInt(serviceId); // Parse the id to integer
  // const serviceData = [

  // ];

  const service = {
    id: 1,
    title: "Autofinder Rent a Car Service",
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
      <button className="button-post-ad">Rent a Car</button>
      {/* <h2>Why AutoFinder is more credible for Car Inspection</h2>
      <div className="steps-container">
        <div className="step-item">
          <img src={reports} alt="Step 1" />
          <p>Extensive reports of vehicles</p>
        </div>
        <div className="step-item">
          <img src={staff} alt="Step 2" />
          <p>Skilled and certified staff</p>
        </div>
        <div className="step-item">
          <img src={inspection} alt="Step 3" />
          <p>Satisfied inspection</p>
        </div>
      </div> */}
      <h2>How AutoFinder Rent a Car Service Works?</h2>
      <div className="steps-container">
        <div className="step-item">
          <img src={one} alt="Step 1" />
          <p>Sign Up for Rent a Car service</p>
        </div>
        <div className="step-item">
          <img src={two} alt="Step 2" />
          <p>Providing details about the vehicle you want to rent</p>
        </div>
        <div className="step-item">
          <img src={three} alt="Step 3" />
          <p>Your rent a car Ad will be displayed in the Rent Car section</p>
        </div>
        <div className="step-item">
          <img src={three} alt="Step 4" />
          <p>Interested customers will contact you as soon as possible</p>
        </div>
      </div>
      {/* <div className="inspection-inclusion-section">
        <h2 style={{ textAlign: "center" }}>
          What's included in the Car Inspection?
        </h2>
        <div
          className="content-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <img
            src={carUpper}
            alt="Included in Car Inspection"
            style={{
              maxWidth: "50%",
              Height: "700px",
            }}
          />
          <div className="text-content" style={{ maxWidth: "45%" }}>
            <h1>Engine</h1>
            <p>
              Utlizing a scanning tool connected to the engine to detect any
              error codes.
            </p>
            <h1>Car Interior</h1>
            <p>
              We conduct assesments on various operational car accessories,
              which encompass air conditioning horn, seatbelts, lock, warning
              indicators and additional components.
            </p>
            <h1>Car Accident Damage Check</h1>
            <p>
              we employ a paint depth test to identify prior repairs and
              scruitinize exposed components. Additionaly, a visual inspection
              is conducted to identify any signs of car damaging resulting from
              accidents.
            </p>
            <h1>Exterior</h1>
            <p>
              We perform inspection detect rust, access prior body repair,
              evaluate the condtiton of panels and examine the suspension
              system.
            </p>
            <h1>Road Check</h1>
            <p>
              We conduct assesments on brake functionality, engine sound, exaust
              emmissions, road performance, steering and various other aspects.
            </p>
            <h1>Tyres Evaluation</h1>
            <p>
              We examine the tyres tread depth on your vehicle and we also
              comapre tyre sizes as needed.
            </p>
            <h1>In Case of Hybrid Car</h1>
            <p>We check hybrid system and hybrid battery percentage.</p>
          </div>
        </div>
      </div> */}
      <div className="note-paragraph">
        <h3>Advantages of Our Application:</h3>
        <li>Easy Booking Process</li>
        <li>Transperent Pricing</li>
        <li>Hassle-Free Service</li>
      </div>
      {/* <h1>Sample AutoFinder Inspection Report</h1>
      <img
        src={inspectionReport}
        alt="Included in Car Inspection"
        style={{
          maxWidth: "50%",
          maxHeight: "200px",
        }}
      /> */}
      <button className="button-post-ad">Book a Car</button>

      <h2>AutoFinder Services</h2>
      <div>
        <button className="button-post-ad">List it for you</button>
        <button className="button-post-ad">Premium Ads</button>
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

export default RentACar;
