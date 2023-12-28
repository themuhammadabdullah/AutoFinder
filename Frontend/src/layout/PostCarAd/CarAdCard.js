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

function CarAdCard() {
  const listItemStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const navigate = useNavigate();
  const CarInfoPageOpener = (e) => {
    e.preventDefault();
    navigate("/sell-vehicle/post-ad/car");
  };
  const centerButtonStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Card sx={{ maxWidth: 250, maxHeight: 420 }}>
      <CardMedia
        sx={{ width: "100%", height: "29vh" }}
        image="https://img.freepik.com/free-vector/buying-renting-new-used-speedy-sports-car_3446-651.jpg?w=740&t=st=1695050574~exp=1695051174~hmac=5efbd031da94fe63de1c605157147f12672cfeb460a526d38c7415ba5d409de0"
        title="Sell Car"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sell Your Car
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li style={listItemStyle}>✔ List your Car for sale in 3 steps</li>
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
          onClick={CarInfoPageOpener}
          style={{ outline: "none", border: "none" }}
        >
          Post Ad
        </Button>
      </CardActions>
    </Card>
  );
}

export default CarAdCard;
