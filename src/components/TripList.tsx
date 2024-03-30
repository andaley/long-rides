import { useState, useEffect } from "react";
import Trip from "./Trip";

export type TripData = {
  id: number;
  dates: string;
  title: string;
  duration: number;
  miles: number;
  elevation: number;
};

function TripList() {
  const [trips, setTrips] = useState<TripData[]>([]);

  async function fetchTrips() {
    return [
      {
        id: 1,
        dates: "March 30, 2024",
        title: "Frog Lake Loop",
        duration: 0,
        miles: 0,
        elevation: 0,
      },
      {
        id: 2,
        dates: "April 15, 2024",
        title: "Three Sisters Wilderness",
        duration: 0,
        miles: 0,
        elevation: 0,
      },
      {
        id: 3,
        dates: "May 5, 2024",
        title: "Mt. Hood",
        duration: 0,
        miles: 0,
        elevation: 0,
      },
    ];
  }

  useEffect(() => {
    fetchTrips().then(setTrips);
  }, []);

  return (
    <div>
      {trips.map((trip) => (
        <Trip key={trip.id} trip={trip} />
      ))}
    </div>
  );
}

export default TripList;
