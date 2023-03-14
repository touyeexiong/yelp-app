const { Pool } = require("pg");

const pool = new Pool({
    user: "touyeexiong",
    host: "localhost",
    database: "yelp-like-app",
    password: "pasword123",
    port: 5432
});
module.exports = {
    query: (text, params) => pool.query(text, params)
};