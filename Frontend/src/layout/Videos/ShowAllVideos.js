//imports
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

//axios
import axios from "axios";

//material-ui
import { Card, CircularProgress, Typography } from "@mui/material";

function ShowAllVideos() {
  const [videos, setVideos] = useState([]);
  const [latestVideo, setLatestVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      getVideos();
    }
  }, [isLoading]);

  const getVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/getVideo", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const videoData = response.data;

        const sortedVideos = videoData.videos.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        const reversedVideos = [...sortedVideos].reverse();

        setVideos(reversedVideos);

        if (reversedVideos.length > 0) {
          setLatestVideo(reversedVideos[0]);
        }
      } else {
        console.error("Failed to get Videos: " + response.data.message);
      }
    } catch (error) {
      console.error("Video fetch error: " + error);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3, margin: "1em" }}>
            {selectedVideo ? (
              <div>
                <h2 style={{ color: "#434343", fontWeight: "bold" }}>
                  Selected Video
                </h2>
                <iframe
                  width="90%"
                  height="450px"
                  src={`https://www.youtube.com/embed/${selectedVideo.link}`}
                  title={selectedVideo.title}
                  allowFullScreen
                  frameBorder="0"
                  style={{
                    margin: "1em 0em",
                    borderRadius: "1em",
                  }}
                ></iframe>
              </div>
            ) : latestVideo ? (
              <div>
                <h2 style={{ color: "#434343", fontWeight: "bold" }}>
                  Latest Video
                </h2>
                <iframe
                  width="90%"
                  height="450px"
                  src={`https://www.youtube.com/embed/${latestVideo.link}`}
                  title={latestVideo.title}
                  allowFullScreen
                  style={{
                    margin: "1em 0em",
                    borderRadius: "1em",
                  }}
                  frameBorder="0"
                ></iframe>
              </div>
            ) : null}
          </div>
          <div
            style={{
              flex: 1,
              overflowY: "scroll",
              maxHeight: "600px",
              border: "2px solid lightgrey",
              borderRadius: "0.8em",
              padding: "1em",
              margin: "1em 0em",
              marginLeft: "-5em",
            }}
          >
            <h2 style={{ color: "#434343", fontWeight: "bold" }}>All Videos</h2>
            <ul>
              {videos.map((video) => (
                <li
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  style={{
                    cursor: "pointer",
                    margin: "1em 0em",
                    borderRadius: "1em",
                    listStyle: "none",
                  }}
                >
                  <p>{video.title}</p>
                  <iframe
                    width="270"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.link}`}
                    title={video.title}
                    allowFullScreen
                    frameBorder="0"
                    style={{
                      margin: "1em 0em",
                      borderRadius: "1em",
                    }}
                  ></iframe>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div style={{ marginTop: "3em" }}>
        <Footer />
      </div>
    </>
  );
}

export default ShowAllVideos;
