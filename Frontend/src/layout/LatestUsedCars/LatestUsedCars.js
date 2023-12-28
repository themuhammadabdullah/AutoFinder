//imports
import React, { useEffect, useState } from "react";

//splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

//axios
import axios from "axios";

//material-ui
import { CircularProgress } from "@mui/material";

function LatestUsedCars() {
  const splideOptions = {
    type: "loop",
    perPage: 3,
    perMove: 1,
  };

  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdsData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/getEveryAd"
        );
        if (response.status === 200) {
          const ads = response.data.cars;
          const approvedAds = ads.filter((ad) => ad.isApproved);

          approvedAds.sort((ad1, ad2) => {
            return new Date(ad2.createdAt) - new Date(ad1.createdAt);
          });

          setAdsData(approvedAds);
          setLoading(false);
        } else {
          console.error("Failed to fetch ads data: " + response.data.message);
        }
      } catch (error) {
        console.error("Error fetching ads data: " + error.toString());
      }
    }

    fetchAdsData();
  }, []);

  const slideStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "300px",
    height: "320px",
    marginBottom: "20px",
  };

  const textStyle = {
    margin: "0.5em",

    color: "blue",
  };

  const priceStyle = {
    margin: "0.5em",

    color: "green",
    fontSize: "14px",
  };

  const locationStyle = {
    margin: "0.5em",
    color: "grey",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "0.6em",
  };

  function formatPrice(price) {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(2) + " Crores";
    } else if (price >= 100000) {
      return (price / 100000).toFixed(2) + " Lacs";
    } else if (price >= 1000) {
      return (price / 1000).toFixed(2) + " Thousands";
    } else {
      return price.toFixed(2) + " PKR";
    }
  }

  return (
    <div className="container">
      {loading ? (
        <Splide options={splideOptions}>
          <SplideSlide>
            <CircularProgress />
          </SplideSlide>
        </Splide>
      ) : (
        <Splide options={splideOptions}>
          {adsData.slice(0, 3).map((ad, index) => (
            <SplideSlide key={index}>
              <div style={slideStyle}>
                <a
                  href="/used-cars"
                  style={{ textDecoration: "none", position: "relative" }}
                >
                  {ad.images.length > 0 && (
                    <div>
                      <img
                        src={`http://localhost:8080/${ad.images[0].replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={`Image 1`}
                        style={imageStyle}
                      />
                    </div>
                  )}
                  <h5 style={textStyle}>{ad.modelName}</h5>
                  <p style={priceStyle}>PKR {formatPrice(ad.price)}</p>
                  <p style={locationStyle}>{ad.city}</p>
                </a>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      )}
    </div>
  );
}

export default LatestUsedCars;
