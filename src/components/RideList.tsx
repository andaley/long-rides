import { useState, useMemo } from "react";
import Ride from "./Ride";
import RideListHeader from "./RideListHeader";
import "./RideList.css";
import Map from "./Map";
import type { SortByProperty } from "./consts/consts";
import Stats from "./Stats";

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
    const uniqueYears = new Set(rides.map((ride) => ride.date.slice(0, 4)));
    return ["all", ...uniqueYears];
  })();

  const handleSelectFilter = (year: string) => {
    setSelectedYear(year);
    setSelectedRide(null);
  };

  const handleSelectRide = (ride: RideData) => {
    // if the ride is already selected, deselect it
    // otherwise, select it
    setSelectedRide(selectedRide && selectedRide.id === ride.id ? null : ride);
  };

  const rideList = filteredAndSortedRides.map((ride) => (
    <Ride
      key={ride.id}
      ride={ride}
      onClick={handleSelectRide}
      isSelected={ride.id === selectedRide?.id}
      sortBy={selectedSortBy}
    />
  ));

  return (
    <>
      <section>
        <RideListHeader
          filterOptions={filterOptions}
          selected={selectedYear}
          onSelectFilter={handleSelectFilter}
          sortBy={selectedSortBy}
          onSortBy={setSelectedSortBy}
          sortOrder={sortOrder}
          onSortOrder={setSortOrder}
        />
        <div className="rideContainer">{rideList}</div>
      </section>
      <section>
        <Map
          selectedRide={selectedRide}
          filteredRides={filteredAndSortedRides}
        />
        <Stats rides={filteredAndSortedRides} selectedYear={selectedYear} />
      </section>
    </>
  );
};

export default RideList;
