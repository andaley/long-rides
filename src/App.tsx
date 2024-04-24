import { useState, useEffect } from "react";
import "./App.css";
import NewTrip from "./components/NewTrip";
import TripList, { TripData } from "./components/TripList";
import TRIPS from "./components/consts/strava.json";

function App() {
  const [trips, setTrips] = useState<TripData[]>([]);

  useEffect(() => {
    setTrips(TRIPS);
  }, []);

  const saveNewTripHandler = (newTrip: TripData) => {
    setTrips((prevState) => {
      return [...prevState, newTrip];
    });
  };

  return (
    <>
      <h1>Long Rides</h1>
      <TripList trips={trips} />
      <NewTrip onSaveNewTrip={saveNewTripHandler} />
    </>
  );
}

export default App;
