import { useState, useEffect, useMemo } from "react";
import Trip from "./Trip";
import TripListHeader from "./TripListHeader";
import "./TripList.css";
import { TRIPS } from "./consts/consts";
import type { SortByProperty } from "./consts/consts";

export type TripData = {
  id: number;
  date: string;
  title: string;
  duration: number;
  miles: number;
  elevation: number;
};

const TripList = () => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSortBy, setSelectedSortBy] = useState<SortByProperty>("date");
  const [sortOrder, setSortOrder] = useState<string>("descending");

  useEffect(() => {
    function fetchTrips() {
      const data = TRIPS;
      setTrips(data);
    }
    fetchTrips();
  }, []);

  const filteredAndSortedTrips = useMemo(() => {
      const filteredTrips = trips.filter((trip) =>
        selectedYear === "all" ? true : trip.date.includes(selectedYear)
      );

      return filteredTrips.sort((a: TripData, b: TripData) => {
        if (selectedSortBy === "date") {
          return sortOrder === "descending"
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date);
        } else {
          return sortOrder === "descending"
            ? b[selectedSortBy] - a[selectedSortBy]
            : a[selectedSortBy] - b[selectedSortBy];
        }
      });
  }, [trips, selectedYear, selectedSortBy, sortOrder]);

  const tripList = filteredAndSortedTrips.map((trip) => (
      <Trip key={trip.id} trip={trip} />
    ));

  return (
    <>
      <TripListHeader
        selected={selectedYear}
        onSelectFilter={setSelectedYear}
        sortBy={selectedSortBy}
        onSortBy={setSelectedSortBy}
        sortOrder={sortOrder}
        onSortOrder={setSortOrder}
      />
      <div className="tripContainer">{tripList}</div>
    </>
  );
};

export default TripList;
