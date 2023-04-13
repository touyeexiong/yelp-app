import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      console.log(response.data.data);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate("/");
  };

  console.log(id);
  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            id="price_range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="form-control"
            type="number"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
