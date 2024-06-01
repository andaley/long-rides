import { useState, useEffect } from "react";
import "./App.css";
import RideList, { RideData } from "./components/RideList";
import Footer from "./components/Footer";
import RIDES from "./components/consts/strava-rides.json";

function App() {
  const [rides, setRides] = useState<RideData[]>([]);

  useEffect(() => {
    setRides(RIDES);
  }, []);


  return (
    <>
      <h1>Long Rides 🚲</h1>
      <RideList rides={rides} />
      <Footer />
    </>
  );
}

export default App;
