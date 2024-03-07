import React, { useState } from "react";
import { Tab, Tabs, Paper } from "@mui/material";
import PopularCars from "../FeaturedNewCars_PopularCars/FeaturedNewCars_PopularCars";
import UpcomingCars from "../FeaturedNewCars_UpcomingCars/FeaturedNewCars_UpcomingCars";
import NewlyLaunchedCars from "../FeaturedNewCars_NewlyLaunchedCars/FeaturedNewCars_NewlyLaunchedCars";

const FeaturedNewCars = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="featured-new-cars">
      <h2
        style={{
          color: "#Ac3803",
          fontSize: "35px",
          fontWeight: "bold",
        }}
      >
        Featured New Cars
      </h2>
      <Paper>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Popular" />
          <Tab label="Upcoming" />
          <Tab label="Newly Launched" />
        </Tabs>
      </Paper>
      <div className="tab-content">
        {activeTab === 0 && <PopularCars />}
        {activeTab === 1 && <UpcomingCars />}
        {activeTab === 2 && <NewlyLaunchedCars />}
      </div>
    </div>
  );
};

export default FeaturedNewCars;
