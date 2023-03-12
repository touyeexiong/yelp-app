const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

app.use(express.json())

// get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  console.log("route handler ran");

  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["McDonalds", "Wendys"],
    },
  });
});

// Create a Restaurant

app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);
});

// get individual restaurants
app.get("/api/v1/restaurants/:restaurantid", (req, res) => {
  console.log(req.params);
});

//http://localhost:

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

// don't want to hardcode as 3005, cause you may change ports in development and production environment. going to install dotenv
