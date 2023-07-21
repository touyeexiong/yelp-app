import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response.data.data);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1;">{selectedRestaurant.restaurant.name}</h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <div>
            <AddReview />
          </div>
        </>
      )}
    </div>
  );
};
export default RestaurantDetailPage;
