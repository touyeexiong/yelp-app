import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate, useParams } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleNavSubmit = () => {
    navigate('/');
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === "Rating" || reviewText === "" || name === "" ){
      alert("Missing information, please fill out the entire form")
    } else {
      try {
        const response = await RestaurantFinder.post(`/${id}/addReview`, {
          name,
          review: reviewText,
          rating,
        });
        window.location.reload(true);
        // navigate(`/`);
        // navigate(`/restaurants/${id}`);
        console.log('we should have navigated by now');
      } catch (error) {
        console.log(error);
      }
    }




  };
  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-grou col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="custom-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled> Rating </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>    
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
        {/* <button type="submit" onClick={handleNavSubmit}>Handle Nav</button> */}
      </form>
    </div>
  );
};

export default AddReview;
