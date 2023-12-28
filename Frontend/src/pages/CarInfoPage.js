//imports
import React, { useState } from "react";
import Navbar from "../layout/Navbar/Navbar";
import CarAdSteps from "../layout/CarInfo/CarAdSteps";
import CarInfoForm from "../layout/CarInfo/CarInfoForm";
import CarImageForm from "../layout/CarInfo/CarImageForm";
import CarContactForm from "../layout/CarInfo/CarContactForm";
import Footer from "../layout/Footer/Footer";

function CarInfoPage() {
  const [carCreated, setCarCreated] = useState(false);
  const [car, setCar] = useState({});

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
        <CarAdSteps />
        <CarInfoForm
          carCreated={carCreated}
          setCar={setCar}
          setCarCreated={setCarCreated}
        />

        <CarImageForm carCreated={carCreated} car={car} />

        <CarContactForm carCreated={carCreated} car={car} />
        <Footer />
      </div>
    </div>
  );
}

export default CarInfoPage;
