//imports
import React, { useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import BikeAdSteps from "../layout/BikeInfo/BikeAdSteps";
import BikeInfoForm from "../layout/BikeInfo/BikeInfoForm";
import BikeImageForm from "../layout/BikeInfo/BikeImageForm";
import BikeContactForm from "../layout/BikeInfo/BikeContactForm";

function BikeInfoPage() {
  const [bikeCreated, setBikeCreated] = useState(false);
  const [bike, setBike] = useState({});

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "70vh",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <BikeAdSteps />
        <BikeInfoForm
          bikeCreated={bikeCreated}
          setBike={setBike}
          setBikeCreated={setBikeCreated}
        />

        <BikeImageForm bikeCreated={bikeCreated} bike={bike} />

        <BikeContactForm bikeCreated={bikeCreated} bike={bike} />
        <Footer />
      </div>
    </div>
  );
}

export default BikeInfoPage;
