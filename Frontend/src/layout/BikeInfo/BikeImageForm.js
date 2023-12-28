//imports
import React, { useEffect, useState } from "react";

//material-ui
import { Avatar, Button, CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DoneIcon from "@mui/icons-material/Done";

//hooks
import { useNavigate } from "react-router-dom";

//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//axios
import axios from "axios";

function BikeImageForm({ bikeCreated, bike }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(-1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSent, setImageSent] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("warning");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const centerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "10vh",
  };
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const newUploadedFiles = [];
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageSrc = e.target.result;
        setSelectedImages((prevSelectedImages) => [
          ...prevSelectedImages,
          { src: imageSrc, isMain: prevSelectedImages.length === 0 },
        ]);

        newUploadedFiles.push({ file, isMain: newUploadedFiles.length === 0 });

        if (newUploadedFiles.length === files.length) {
          setUploadedFiles(newUploadedFiles);

          console.log("FormData after appending files:", formData);
        }
      };

      reader.readAsDataURL(file);

      formData.append(`image${i}`, file);
    }
  };
  const [image, setImage] = useState();

  const onInputChange = (event) => {
    const files = event.target.files;
    const newUploadedFiles = [];
    const newSelectedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newUploadedFiles.push({ file, isMain: false });

      const imageURL = URL.createObjectURL(file);
      newSelectedImages.push({ src: imageURL, isMain: false });
    }

    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...newSelectedImages,
    ]);

    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      ...newUploadedFiles,
    ]);
  };

  const submitImage = async (e) => {
    e.preventDefault();

    if (!bikeCreated) {
      toast.error("Please submit the bike info form first.");

      setSelectedImages([]);
      setUploadedFiles([]);
      return;
    }
    if (uploadedFiles.length < 2) {
      toast.error("Please choose minimum 2 images.");

      return;
    }
    setShowAlert(false);
    setIsLoading(true);
    const formData = new FormData();

    uploadedFiles.forEach((fileData, index) => {
      formData.append("images[]", fileData.file);
    });

    formData.append("bike", JSON.stringify(bike));

    try {
      const response = await axios.post(
        "http://localhost:8080/ad/bike-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Images uploaded successfully");
        setImageSent(true);
        toast.success("Step 2 Completed");

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);

      console.error("Error uploading images:", error);
      setAlertSeverity("error");
      setAlertMessage("Error uploading images. Please try again.");
      setShowAlert(true);
      toast.error("Error uploading images. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);

    const formData = new FormData();
    uploadedFiles.forEach((fileData, index) => {
      formData.append(`image${index}`, fileData.file);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/ad/bike-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Images uploaded successfully");
      } else {
        // Handle non-200 status codes here
        console.error("Image upload failed with status code:", response.status);
        setAlertSeverity("error");
        setAlertMessage("Image upload failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSetMainImage = (index) => {
    setMainImageIndex(index);
  };

  return (
    <div className="container my-5">
      <div
        className="biked p-4"
        style={{
          width: "100%",
          border: "2px solid lightgrey",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "130%",
          borderStyle: "outset",
        }}
      >
        <div className="biked-content">
          <h2 style={{ color: "#333333" }}>Step 2: Upload Images</h2>
          <p>Photos should be in 'jpeg, jpg, png, gif' format only.</p>

          <div className="form-group">
            {!imageSent && (
              <label htmlFor="imageUpload" className="btn btn-primary">
                Add Images
                <input
                  type="file"
                  id="imageUpload"
                  name="images"
                  accept="image/jpeg, image/jpg, image/png, image/gif"
                  style={{ display: "none" }}
                  multiple
                  onChange={onInputChange}
                />
              </label>
            )}
            <ToastContainer />

            {selectedImages.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  >
                    <img
                      src={image.src}
                      alt={`Image ${index}`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        marginBottom: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            {showAlert && (
              <Alert severity={alertSeverity}>
                <AlertTitle>
                  {alertSeverity === "error" ? "Error" : "Warning"}
                </AlertTitle>
                {alertMessage}
              </Alert>
            )}
            {selectedImages.length === 0 && <p>No file chosen</p>}
            <small>
              <span style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt="Tick"
                  src="https://img.freepik.com/free-vector/green-double-circle-check-mark_78370-1749.jpg?w=740&t=st=1695133203~exp=1695133803~hmac=138fe4f59033b858ba29f89d6f574988d937349c516f6f78cb5c3bfd770570bf"
                  sx={{ width: 24, height: 24, m: 1 }}
                />
                Adding at least 8 pictures improves the chances for a quick
                sale.
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt="Tick"
                  src="https://img.freepik.com/free-vector/green-double-circle-check-mark_78370-1749.jpg?w=740&t=st=1695133203~exp=1695133803~hmac=138fe4f59033b858ba29f89d6f574988d937349c516f6f78cb5c3bfd770570bf"
                  sx={{ width: 24, height: 24, m: 1 }}
                />
                Adding clear Front, Back, and Interior pictures of your bike
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt="Tick"
                  src="https://img.freepik.com/free-vector/green-double-circle-check-mark_78370-1749.jpg?w=740&t=st=1695133203~exp=1695133803~hmac=138fe4f59033b858ba29f89d6f574988d937349c516f6f78cb5c3bfd770570bf"
                  sx={{ width: 24, height: 24, m: 1 }}
                />
                Increases the quality of your Ad and gets you noticed more.
              </span>
            </small>
          </div>

          <div style={centerStyle}>
            {isLoading ? (
              <CircularProgress />
            ) : imageSent ? (
              <DoneIcon fontSize="large" style={{ color: "green" }} />
            ) : (
              <Button
                onClick={submitImage}
                style={{ outline: "none", border: "none" }}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BikeImageForm;
