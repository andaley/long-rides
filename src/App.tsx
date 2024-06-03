import { useState, useEffect } from "react";
import "./App.css";
import ThemeContext from "./context/ThemeContext";
import RideList, { RideData } from "./components/RideList";
import Footer from "./components/Footer";
import RIDES from "./components/consts/strava-rides.json";

function App() {
  const [rides, setRides] = useState<RideData[]>([]);

  useEffect(() => {
    setRides(RIDES);
  }, []);

  return (
    <ThemeContext>
      <header>
        <h1>Long Rides 🚲</h1>
      </header>
      <main>
        <RideList rides={rides} />
      </main>
      <Footer />
    </ThemeContext>
  );
}

export default App;
