const express = require("express");
const cors = require("cors"); // Import the cors middleware
const bodyParser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, 
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adRoutes = require("./routes/adRoutes");
const adminRoutes = require("./routes/adminRoutes");
app.use(express.json()); // Add this line to parse JSON data
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(
    "mongodb://rememberthename1202:pakwheels123@ac-bb8wqgs-shard-00-00.uvlo1wx.mongodb.net:27017,ac-bb8wqgs-shard-00-01.uvlo1wx.mongodb.net:27017,ac-bb8wqgs-shard-00-02.uvlo1wx.mongodb.net:27017/Pak-Wheels?ssl=true&replicaSet=atlas-scz482-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(8080, function () {
      console.log("Server running on 8080");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/ad", adRoutes);
app.use("/admin", adminRoutes);
