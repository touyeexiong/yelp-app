import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant)
      } catch (error) {
        console.log(error);
      }


    };
    fetchData();
  }, []);
  return <div>{selectedRestaurant && <StarRating rating={3.5}/>}</div>;
};
export default RestaurantDetailPage;
