const express = require("express");
require("dotenv").config();

const app = express();

app.get("/getRestaurants", (req, res) => {
    console.log('get all restaurants');
    
})
//http://localhost:

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

// don't want to hardcode as 3005, cause you may change ports in development and production environment. going to install dotenv
