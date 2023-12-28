//imports
import React, { useState } from "react";

//material-ui
import {
  ButtonBase,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material";

//hooks
import { useSelector } from "react-redux";
import { useEffect } from "react";

//store
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//axios
import axios from "axios";

function BikeInfoForm({ bikeCreated, setBikeCreated, setBike }) {
  const user = useSelector((state) => state.authentication.user);
  const userId = user._id;

  const [formData, setFormData] = useState({
    city: "",
    modelName: "",
    registeredIn: "",
    color: "",
    mileage: "",
    price: "",
    description: "",
    engineType: "",
    engineCapacity: "",
    modelYear: "",
  });
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      setTimeout(async () => {
        const response = await axios.post(
          "http://localhost:8080/ad/post-bike-ad",
          {
            formData,
            selectedFeatures,
            userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setIsLoading(false);
          toast.success("Step 1 Completed");
          setBikeCreated(true);
          const bikeData = response.data.bike;
          setBike(bikeData);
        } else {
          setIsLoading(false);

          toast.error(response.data.error);
        }
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (event) => {
    setFormData({ ...formData, color: event.target.value });
  };

  const handleEngineType = (event) => {
    setFormData({ ...formData, engineType: event.target.value });
  };
  const handleEngineCapacity = (event) => {
    setFormData({ ...formData, engineCapacity: event.target.value });
  };
  const handleTransmission = (event) => {
    setFormData({ ...formData, transmission: event.target.value });
  };
  const handlemodelYear = (event) => {
    setFormData({ ...formData, modelYear: event.target.value });
  };

  const handleFeatureChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedFeatures([...selectedFeatures, value]);
    } else {
      setSelectedFeatures(
        selectedFeatures.filter((feature) => feature !== value)
      );
    }
  };

  const features = [
    "Anti Theft Lock",
    "LED Lights",
    "Disc Break",
    "Alloy Rims",
    "Wind Sheild",
    "Self Start",
  ];

  const [priceMagnitude, setPriceMagnitude] = useState("");
  const [isPriceValid, setIsPriceValid] = useState(true);

  const calculateMagnitudeAndValidity = (value) => {
    if (value === "") {
      setIsPriceValid(true);
      return null;
    }

    const priceValue = parseInt(value, 10);

    if (priceValue >= 100000000) {
      setIsPriceValid(false);
      return "Invalid Price";
    } else if (priceValue >= 10000000) {
      setIsPriceValid(true);
      return "Crores";
    } else if (priceValue >= 1000000) {
      setIsPriceValid(true);
      return "Lacs";
    } else if (priceValue >= 100000) {
      setIsPriceValid(true);
      return "Lac";
    } else if (priceValue >= 10000) {
      setIsPriceValid(true);
      return "Thousands";
    } else if (priceValue >= 1000) {
      setIsPriceValid(true);
      return "Thousand";
    } else if (priceValue >= 100) {
      setIsPriceValid(true);
      return "Hundred";
    } else {
      setIsPriceValid(true);
      return null;
    }
  };

  useEffect(() => {
    const updatePriceMagnitude = () => {
      const magnitude = calculateMagnitudeAndValidity(formData.price);
      setPriceMagnitude(magnitude);
    };

    updatePriceMagnitude();
  }, [formData.price]);

  return (
    <div className="container mt-5 ">
      <div
        className="card p-4"
        style={{
          width: "100%",
          height: "100%",
          border: "2px solid lightgrey",
          borderStyle: "outset",
        }}
      >
        <div className="card-content">
          <h2 style={{ color: "#333333" }}>Step 1: Bike Information</h2>
          <p>(All fields marked with * are mandatory)</p>
          <ToastContainer />

          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <select
                    className="form-control"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value="">Select City</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="modelName">Model Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modelName"
                    name="modelName"
                    required
                    value={formData.modelName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="registeredIn">Registered In *</label>
                  <select
                    className="form-control"
                    id="registeredIn"
                    name="registeredIn"
                    required
                    value={formData.registeredIn}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Region</option>
                    <option value="Un-Registered">Un-Registered</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="KPK">KPK</option>
                    <option value="Balochistan">Balochistan</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="color">Exterior Color *</label>
                  <select
                    className="form-control"
                    id="color"
                    name="color"
                    required
                    value={formData.color}
                    onChange={handleColorChange}
                  >
                    <option value="">Select Color</option>
                    <option
                      value="White"
                      style={{ color: "black", backgroundColor: "white" }}
                    >
                      White
                    </option>
                    <option
                      value="Black"
                      style={{ color: "white", backgroundColor: "black" }}
                    >
                      Black
                    </option>

                    <option
                      value="Silver"
                      style={{ color: "white", backgroundColor: "#808080" }}
                    >
                      Silver
                    </option>
                    <option
                      value="Blue"
                      style={{ color: "white", backgroundColor: "#0000FF" }}
                    >
                      Blue
                    </option>
                    <option
                      value="Red"
                      style={{ color: "white", backgroundColor: "#FF0000" }}
                    >
                      Red
                    </option>

                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="Engine">Engine Type *</label>
                  <select
                    className="form-control"
                    id="engine"
                    name="engine"
                    required
                    value={formData.engineType}
                    onChange={handleEngineType}
                  >
                    <option value="">Engine Type</option>
                    <option value="2Stroke">2 Stroke</option>
                    <option value="4Stroke">4 Stroke</option>
                    <option value="5Stroke">5 Stroke</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="engineCapacity">Engine Capacity * (cc)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="engineCapacity"
                    name="engineCapacity"
                    required
                    value={formData.engineCapacity}
                    onChange={handleEngineCapacity}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="modelYear">Model Year * (e.g 2020)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modelYear"
                    name="modelYear"
                    required
                    value={formData.modelYear}
                    onChange={handlemodelYear}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="mileage">Mileage *</label>
                  <input
                    type="number"
                    className="form-control"
                    id="mileage"
                    name="mileage"
                    min="1"
                    max="1000000"
                    required
                    value={formData.mileage}
                    onChange={handleInputChange}
                  />
                  <small className="form-text">
                    Enter valid mileage (1-1000000)
                  </small>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="Features">Features</label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      border: "2px solid lightgrey",
                      padding: "20px",
                      maxWidth: "300px",
                      margin: "0 auto",
                      borderRadius: "10px",
                      borderStyle: "outset",
                    }}
                  >
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        style={{
                          width: "50%",
                          padding: "0px",
                          boxSizing: "border-box",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={selectedFeatures.includes(feature)}
                              onChange={handleFeatureChange}
                              value={feature}
                            />
                          }
                          label={feature}
                          labelPlacement="end"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-sm-12">
                <div className="form-group">
                  <label
                    htmlFor="price"
                    style={{ fontWeight: "bold", color: "#318F3A" }}
                  >
                    Price *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  {priceMagnitude !== null && (
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        {priceMagnitude}
                      </span>
                    </p>
                  )}
                  {!isPriceValid && (
                    <div className="invalid-feedback">Invalid Price</div>
                  )}
                </div>
              </div>
              <div className="col-xs-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="description">Add Description *</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    required
                    placeholder="Describe Your Bike..."
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            {isLoading ? (
              <CircularProgress size={32} />
            ) : bikeCreated ? (
              <DoneIcon fontSize="large" style={{ color: "green" }} />
            ) : isPriceValid ? (
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            ) : (
              <button type="submit" className="btn btn-secondary mt-3" disabled>
                Invalid Price
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default BikeInfoForm;
