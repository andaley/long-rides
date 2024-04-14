import { useState, useEffect } from "react";
import './App.css'
import Map from './components/Map'
import NewTrip from './components/NewTrip'
import TripList, { TripData } from './components/TripList'
import { TRIPS } from "./components/consts/consts";


function App() {
  const [trips, setTrips] = useState<TripData[]>([]);

  useEffect(() => {
    function fetchTrips() {
      const data = TRIPS;
      setTrips(data);
    }
    fetchTrips();
  }, []);

  const saveNewTripHandler = (newTrip: TripData) => {
    setTrips((prevState) => {
      return [...prevState, newTrip];
    });
  };

  return (
    <>
      <h1>Trip Tracker</h1>
      <Map />
      <TripList trips={trips} />
      <NewTrip onSaveNewTrip={saveNewTripHandler} />
    </>
  )
}

export default App
