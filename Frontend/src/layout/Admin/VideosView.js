//imports
import React, { useEffect, useState } from "react";

//material-ui
import {
  Paper,
  Tabs,
  Tab,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//axios
import axios from "axios";

function VideosView() {
  const [value, setValue] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getVideos();
  }, []);

  const isUrlValid = (url) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleUploadVideo = async () => {
    if (!isUrlValid(videoUrl)) {
      toast.error(
        "Invalid URL. Please enter a valid URL starting with 'http' or 'https'."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/adVideo",
        {
          videoUrl: videoUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Video Uploaded Successfully");
        getVideos();
        setVideoUrl("");
        setOpenDialog(false);
      } else {
        toast.error("Failed to Upload Video: " + response.data.message);
      }
    } catch (error) {
      console.error("Video Upload error: " + error);
      toast.error("Failed to upload video: " + error.toString());
    } finally {
      setLoading(false);
    }
  };

  const getVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/getVideo", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const videos = response.data.videos;

        videos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setVideos(videos);
      } else {
        toast.error("Failed to get Videos: " + response.data.message);
      }
    } catch (error) {
      console.error("Video fetch error: " + error);
      toast.error("Failed to Get videos: " + error.toString());
    }
  };

  const openAddVideoDialog = () => {
    setOpenDialog(true);
  };

  const closeAddVideoDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/DeleteVideo",
        {
          videoId: videoId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Video Deleted Successfully");
        getVideos();
      } else {
        toast.error("Failed to Delete Video: " + response.data.message);
      }
    } catch (error) {
      console.error("Video delete error: " + error);
      toast.error("Failed to delete video: " + error.toString());
    }
  };

  return (
    <div style={{ marginTop: "3em", padding: "1em" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <div style={{ marginTop: "1em" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={openAddVideoDialog}
              style={{ marginTop: "1em", marginRight: "1em" }}
            >
              Add New Video
            </Button>
            <Tabs value={value} onChange={handleTabChange}>
              <Tab label="Currently Live Videos" />
            </Tabs>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {videos.map((video) => (
                <Card key={video._id} style={{ margin: "1em", width: "300px" }}>
                  <CardMedia
                    component="iframe"
                    title={`Video ${video._id}`}
                    height="200"
                    src={`https://www.youtube.com/embed/${video.link}`}
                    frameBorder="0"
                    allowFullScreen
                  />

                  <CardActions>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteVideo(video._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={closeAddVideoDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the URL of the video you want to add.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="videoUrl"
            label="Video URL"
            type="url"
            fullWidth
            value={videoUrl}
            onChange={handleVideoUrlChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddVideoDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUploadVideo}
            color="primary"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VideosView;
