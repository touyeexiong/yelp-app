import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";

// const RestaurantList = () => {

//     const getRestaurantList = async () =>{
//         try {
//             const response = await RestaurantFinder.get("/");
//             console.log(response.data.data.restaurants);
//           } catch (error) {}

//     }
//     useEffect(() => {
//         getRestaurantList();
//     }, []);
// the array allows it to only run when it mounts, preventing an infinite loop
const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (error) {}
    };
    fetchData();
    console.log(restaurants);
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (error) {}
  };

  const handleUpdate = (id) => {
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`)
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>{/* {JSON.stringify({restaurants})} */}</tr>
          {/* && placed there to say if restaurants exist, run code and if not don't
                prevents it from showing restaurants that don't exists.
            */}
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>reviews</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* <tr className="bg-secondary">
            <td>mcdonalds</td>
            <td>New York</td>
            <td>$$</td>
            <td>rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr className="bg-secondary">
            <td>mcdonalds</td>
            <td>New York</td>
            <td>$$</td>
            <td>rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
