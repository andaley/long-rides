import { useState, useMemo } from "react";
import Ride from "./Ride";
import RideListHeader from "./RideListHeader";
import "./RideList.css";
import Map from "./Map";
import type { SortByProperty } from "./consts/consts";

export type RideData = {
  id: number;
  date: string;
  title: string;
  duration: number;
  miles: number;
  elevation: number;
  map: [number, number][];
};

type RideListProps = {
  rides: RideData[];
};

const RideList = (props: RideListProps) => {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSortBy, setSelectedSortBy] = useState<SortByProperty>("date");
  const [sortOrder, setSortOrder] = useState<string>("descending");
  const [selectedRide, setSelectedRide] = useState<RideData | null>(null);
  
  const { rides } = props;

  const filteredAndSortedRides = useMemo(() => {
    const filteredRides = rides.filter((ride) =>
      selectedYear === "all" ? true : ride.date.includes(selectedYear)
    );

    return filteredRides.sort((a: RideData, b: RideData) => {
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
  }, [rides, selectedYear, selectedSortBy, sortOrder]);

  const filterOptions = (() => {
    const uniqueYears = new Set(
      rides.map((ride) => ride.date.slice(0, 4))
    );
    return ["all", ...uniqueYears];
  })();

  const rideList = filteredAndSortedRides.map((ride) => (
    <Ride key={ride.id} ride={ride} onClick={setSelectedRide} isSelected={ride.id === selectedRide?.id} />
  ));

  return (
    <>
      <Map selectedRide={selectedRide} filteredRides={filteredAndSortedRides} />
      <RideListHeader
        filterOptions={filterOptions}
        selected={selectedYear}
        onSelectFilter={setSelectedYear}
        sortBy={selectedSortBy}
        onSortBy={setSelectedSortBy}
        sortOrder={sortOrder}
        onSortOrder={setSortOrder}
      />
      <div className="rideContainer">{rideList}</div>
    </>
  );
};

export default RideList;
