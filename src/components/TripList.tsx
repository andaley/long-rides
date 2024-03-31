import { useState, useEffect } from "react";
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

  async function fetchTrips() {
    return TRIPS;
  }

  useEffect(() => {
    fetchTrips().then(setTrips);
  }, []);

  const onSelectFilter = (year: string) => {
    setSelectedYear(year);
  };

  const onSelectSortBy = (sortByProperty: SortByProperty) => {
    setSelectedSortBy(sortByProperty);
  };

  const onSortOrder = (sortOrder: string) => {
    setSortOrder(sortOrder);
    sortTrips(trips);
  };

  const sortTrips = (filteredTrips: TripData[]) => {
    if (selectedSortBy === "date") {
      if (sortOrder === "descending") {
        return filteredTrips.sort((a: TripData, b: TripData) =>
          a.date.localeCompare(b.date)
        );
      } else {
        return filteredTrips.sort((a: TripData, b: TripData) =>
          b.date.localeCompare(a.date)
        );
      }
    }
    if (sortOrder === "descending") {
      return filteredTrips.sort(
        (a: TripData, b: TripData) => b[selectedSortBy] - a[selectedSortBy]
      );
    }
    return filteredTrips.sort(
      (a: TripData, b: TripData) => a[selectedSortBy] - b[selectedSortBy]
    );
  };

  const filteredSortedTrips = sortTrips(
    trips.filter((trip) =>
      selectedYear === "all" ? true : trip.date.includes(selectedYear)
    )
  );

  return (
    <div>
      <TripListHeader
        selected={selectedYear}
        onSelectFilter={onSelectFilter}
        sortBy={selectedSortBy}
        onSortBy={onSelectSortBy}
        sortOrder={sortOrder}
        onSortOrder={onSortOrder}
      />
      <div className="tripContainer">
        {filteredSortedTrips.map((trip) => (
          <Trip key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default TripList;
