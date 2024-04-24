import { useState, useEffect } from "react";
import "./App.css";
import TripList, { TripData } from "./components/TripList";
import TRIPS from "./components/consts/strava.json";

function App() {
  const [trips, setTrips] = useState<TripData[]>([]);

  useEffect(() => {
    setTrips(TRIPS);
  }, []);


  return (
    <>
      <h1>Long Rides</h1>
      <TripList trips={trips} />
    </>
  );
}

export default App;
