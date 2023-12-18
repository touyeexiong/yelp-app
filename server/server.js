const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(express.json());

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurantRatingsData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurant: restaurantRatingsData.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// get individual restaurants
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params);
  try {
    id = req.params.id;
    const restaurant = await db.query(
      `select * from restaurants left join 
      (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) 
      as average_rating from reviews group by restaurant_id) reviews 
      on restaurants.id = reviews.restaurant_id where id = $1;`,
      [id]
    );
    id = req.params.id;
    const reviews = await db.query(
      `SELECT * from reviews WHERE restaurant_id = $1`,
      [id]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }

  console.log(req.params.id);
  console.log(req.body);
});

// Delete Restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE from restaurants where id=$1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );

    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (error) {}
});

//http://localhost:

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

// don't want to hardcode as 3005, cause you may change ports in development and production environment. going to install dotenv
