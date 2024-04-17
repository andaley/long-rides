import { useState, useMemo } from "react";
import Trip from "./Trip";
import TripListHeader from "./TripListHeader";
import "./TripList.css";
import Map from "./Map";
import type { SortByProperty } from "./consts/consts";

export type TripData = {
  id: number;
  date: string;
  title: string;
  duration: number;
  miles: number;
  elevation: number;
  map: [number, number][];
};

type TripListProps = {
  trips: TripData[];
};

const TripList = (props: TripListProps) => {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSortBy, setSelectedSortBy] = useState<SortByProperty>("date");
  const [sortOrder, setSortOrder] = useState<string>("descending");
  const { trips } = props;

  const filteredAndSortedTrips = useMemo(() => {
    const filteredTrips = trips.filter((trip) =>
      selectedYear === "all" ? true : trip.date.includes(selectedYear)
    );

    return filteredTrips.sort((a: TripData, b: TripData) => {
      if (selectedSortBy === "date") {
        return sortOrder === "descending"
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date);
      } else {
        return sortOrder === "descending"
          ? b[selectedSortBy] - a[selectedSortBy]
          : a[selectedSortBy] - b[selectedSortBy];
      }
    });
  }, [trips, selectedYear, selectedSortBy, sortOrder]);

  const filterOptions = useMemo(() => {
    const uniqueYears = new Set(
      filteredAndSortedTrips.map((trip) => trip.date.slice(0, 4))
    );
    return ["all", ...uniqueYears];
  }, [filteredAndSortedTrips]);

  const tripList = filteredAndSortedTrips.map((trip) => (
    <Trip key={trip.id} trip={trip} />
  ));

  const polylines = useMemo(() => {
    return filteredAndSortedTrips.map((trip) => trip.map);
  }, [filteredAndSortedTrips]);

  return (
    <>
      <Map polylines={polylines} />
      <TripListHeader
        filterOptions={filterOptions}
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
