//imports
import React, { useState, useEffect } from "react";

//material-ui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//hooks
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//store
import { Activate } from "../../store/navbarSlice";

//toastify
import { toast } from "react-toastify";

//axios
import axios from "axios";

//splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

function Browsevideos() {
  const [videos, setVideos] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/getVideo", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const videos = response.data.videos;
        setVideos(videos);
      } else {
        toast.error("Failed to get Videos: " + response.data.message);
      }
    } catch (error) {
      console.error("Video fetch error: " + error);
      toast.error("Failed to Get videos: " + error.toString());
    }
  };

  const splideOptions = {
    type: "loop",
    perPage: 3,
    perMove: 1,
  };

  const slideStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "8em",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "20px",
    height: "200px",
    width: "95%",
  };

  const imageContainerStyle = {
    background: "linear-gradient(to bottom, #E7232D, #012D62)",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    padding: "1.5em",
    borderRadius: "1em",
  };

  const textStyle = {
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const VideoNavigate = (e) => {
    e.preventDefault();
    dispatch(Activate({ user: "Videos" }));
    navigate("/videos");
  };

  const openYouTubeVideo = (videoUrl) => {
    window.open(videoUrl, "_blank");
  };

  return (
    <Grid container style={{ marginTop: "10em", background: "#F2F3F3" }}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontWeight="bold"
          padding="20px"
        >
          <a href="/videos" onClick={VideoNavigate} style={{ color: "black" }}>
            Latest Videos
          </a>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box mt={2}>
          <Splide options={splideOptions}>
            {videos.map((video, index) => (
              <SplideSlide key={index}>
                <div style={slideStyle} className="card">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.link}`}
                    title={video.desc}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <iframe
                      style={{ borderRadius: "15px" }}
                      src={`https://www.youtube.com/embed/${video.link}`}
                      title={video.desc}
                      allowFullScreen
                      onClick={() =>
                        openYouTubeVideo(
                          `https://www.youtube.com/watch?v=${video.link}`
                        )
                      }
                    ></iframe>
                    <p>{video.desc}</p>
                  </a>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Browsevideos;
