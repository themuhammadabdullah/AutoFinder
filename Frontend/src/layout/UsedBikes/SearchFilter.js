//imports
import React, { useEffect, useState } from "react";

//material-ui
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

function SearchFilters({ filterOptions, setFilterOptions }) {
  const [adsData, setAdsData] = useState([]);
  const [cities, setCities] = useState([]);
  const [engineCapacity, setEngineCapacity] = useState([]);
  const [engineCapacityOptions, setEngineCapacityOptions] = useState([]);
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [modelYearOptions, setModelYearOptions] = useState([]);

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    getAllAds();
  }, []);
  const getAllAds = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getEveryAd"
      );

      if (response.status === 200) {
        const Defaultads = response.data.bikes;
        const ads = Defaultads.filter((ad) => ad.isApproved);

        const uniqueCities = Array.from(
          new Set(ads.map((ad) => ad.city))
        ).filter((city) => city);
        const uniqueProvinces = Array.from(
          new Set(ads.map((ad) => ad.registeredIn))
        ).filter((province) => province);
        const uniqueEngineCapacities = Array.from(
          new Set(ads.map((ad) => ad.engineCapacity))
        ).filter((engineCapacity) => engineCapacity);
        const uniqueTransmissions = Array.from(
          new Set(ads.map((ad) => ad.transmission))
        ).filter((transmission) => transmission);
        const uniqueColors = Array.from(
          new Set(ads.map((ad) => ad.color))
        ).filter((color) => color);
        const uniqueModelYears = Array.from(
          new Set(ads.map((ad) => ad.modelYear))
        ).filter((modelYear) => modelYear);

        setAdsData(ads);
        setCities(uniqueCities);
        setProvinces(uniqueProvinces);
        setEngineCapacityOptions(uniqueEngineCapacities);
        setTransmissionOptions(uniqueTransmissions);
        setColorOptions(uniqueColors);
        setModelYearOptions(uniqueModelYears);
      } else {
        toast.error("Failed to load ads: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading ads error: " + error);
      toast.error("Failed to load ads: " + error.toString());
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "15em",
        padding: "2em",
        background: "#F2F3F3",
        margin: "0.5em",
        borderRadius: "0.5em",
      }}
    >
      <Typography variant="outlined" style={{ fontWeight: "bold" }}>
        Filter Ads:
      </Typography>

      <ToastContainer />

      <FormControl fullWidth variant="outlined" style={{ marginTop: "0.5em" }}>
        <label>Available In</label>
        <Select
          name="city"
          onChange={handleFilterChange}
          value={filterOptions.city}
        >
          <MenuItem value="">All</MenuItem>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" style={{ marginTop: "0.5em" }}>
        <label>Registered In</label>
        <Select
          name="province"
          onChange={handleFilterChange}
          value={filterOptions.province}
        >
          <MenuItem value="">All</MenuItem>
          {provinces.map((province) => (
            <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" style={{ marginTop: "0.5em" }}>
        <label>Engine Capacity</label>
        <Select
          name="engineCapacity"
          onChange={handleFilterChange}
          value={filterOptions.engineCapacity}
        >
          <MenuItem value="">All</MenuItem>
          {engineCapacityOptions.map((capacity) => (
            <MenuItem key={capacity} value={capacity}>
              {capacity}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" style={{ marginTop: "0.5em" }}>
        <label>Color</label>
        <Select
          name="color"
          onChange={handleFilterChange}
          value={filterOptions.color}
        >
          <MenuItem value="">All</MenuItem>
          {colorOptions.map((color) => (
            <MenuItem key={color} value={color}>
              {color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" style={{ marginTop: "0.5em" }}>
        <label>Model Year</label>
        <Select
          name="modelYear"
          onChange={handleFilterChange}
          value={filterOptions.modelYear}
        >
          <MenuItem value="">All</MenuItem>
          {modelYearOptions.map((modelYear) => (
            <MenuItem key={modelYear} value={modelYear}>
              {modelYear}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={getAllAds}
        style={{ marginTop: "1em", outline: "none", border: "none" }}
      >
        Apply Filter
      </Button>
    </div>
  );
}

export default SearchFilters;
