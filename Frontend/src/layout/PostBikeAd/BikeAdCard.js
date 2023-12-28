//imports
import React from "react";

//material-ui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//hooks
import { useNavigate } from "react-router-dom";

function BikeAdCard() {
  const listItemStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const centerButtonStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const navigate = useNavigate();
  const BikeInfoPageOpener = (e) => {
    e.preventDefault();
    navigate("/sell-vehicle/post-ad/bike");
  };
  return (
    <Card sx={{ maxWidth: 250, maxHeight: 420 }}>
      <CardMedia
        sx={{ width: "100%", height: "29vh" }}
        image="https://img.freepik.com/free-vector/vehicle-sale-concept-illustration_114360-2082.jpg?w=740&t=st=1695050588~exp=1695051188~hmac=4e34bf18d8804d252d541bc22c05b3a00b54dfc7d77d67589a35e758ecfceb9b"
        title="Sell Bike"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sell Your Bike
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li style={listItemStyle}>✔ List your bike for sale in 3 steps</li>
            <li style={listItemStyle}>✔ Connect with genuine buyers</li>
            <li style={listItemStyle}>✔ Get the best price for your bike</li>
          </ul>
        </Typography>
      </CardContent>
      <CardActions style={centerButtonStyle}>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={BikeInfoPageOpener}
          style={{ outline: "none", border: "none" }}
        >
          Post Ad
        </Button>
      </CardActions>
    </Card>
  );
}

export default BikeAdCard;
