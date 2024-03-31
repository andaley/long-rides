import { useState, useEffect } from "react";
import Trip from "./Trip";
import TripListHeader from "./TripListHeader";

export type TripData = {
  id: number;
  dates: string;
  title: string;
  duration: number;
  miles: number;
  elevation: number;
};

const TripList = () => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("2022");

  async function fetchTrips() {
    return [
      {
        id: 1,
        dates: "June 30, 2023",
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
        dates: "May 5, 2022",
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

  const onSelectFilter = (year: string) => {
    setSelectedYear(year);
  };

  const filteredTrips = trips.filter((trip) =>
    selectedYear === "all" ? true : trip.dates.includes(selectedYear)
  ).sort((a, b) => b.dates.localeCompare(a.dates));

  return (
    <div>
      <TripListHeader selected={selectedYear} onSelectFilter={onSelectFilter} />
      {filteredTrips.map((trip) => (
        <Trip key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
