/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

//Components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import List from "../../components/List/List";
import Map from "../../components/Map/Map";

// Map API
import * as mapAPI from "../../utilities/api/map";

import "./searchMap.css";

const SearchMap = ({ user }) => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClick, setChildClick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  //Get Current Location Coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  //Get All Places
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      mapAPI.getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  //Filter Place by their rating
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  return (
    <>
      <Header />
      <main className="searchMap">
        <List
          places={filteredPlaces.length ? filteredPlaces : places}
          childClick={childClick}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          user={user}
        />
        <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClick={setChildClick}
        />
      </main>
      <Footer />
    </>
  );
};

export default SearchMap;
