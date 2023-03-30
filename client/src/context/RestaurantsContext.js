import React, { useState, createContext } from "react";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  return (
    // whenever you have the key and the value = to the same thing,
    // you can just use the key as a shorthand without writing restaurants: restaurants
    <RestaurantContext.Provider value={{ restaurants, setRestaurants }}>
      {props.children}
    </RestaurantContext.Provider>
  );
};
