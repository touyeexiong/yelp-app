const express = require("express");
require("dotenv").config();

const app = express();

// middleware
// middleware must be told explicitly to run to route handler
// location of middleware matters
app.use((req, res, next) => {
  console.log("yeah our middleware ran");
  next();
});

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
  console.log(req);
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
