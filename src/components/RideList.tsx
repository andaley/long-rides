import { useState, useMemo } from "react";
import { ArrowUpFromDot } from "lucide-react";
import Ride from "./Ride";
import RideListHeader from "./RideListHeader";
import "./RideList.css";
import Map from "./Map";
import Stats from "./Stats";
import SortChevron from "./SortChevron";
import type { SortByProperty, SortOpts } from "./consts/consts";

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
  const [sortOrder, setSortOrder] = useState<SortOpts>("descending");
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
      } else if (selectedSortBy === "title") {
        return sortOrder === "descending"
          ? (b["title"] > a["title"] ? -1 : 1)
          : (a["title"] > b["title"] ? -1 : 1);
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

  const handleSort = (sortBy: SortByProperty, sortOrder: SortOpts) => {
    setSelectedSortBy(sortBy);
    setSortOrder(sortOrder);
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
    />
  ));

  return (
    <>
      <Map selectedRide={selectedRide} filteredRides={filteredAndSortedRides} />
      <Stats rides={filteredAndSortedRides} />
      <RideListHeader
        filterOptions={filterOptions}
        selected={selectedYear}
        onSelectFilter={handleSelectFilter}
      />
      <table className="rideContainer">
        <thead>
          <tr>
            <th>
              Date{" "}
              <SortChevron
                sortBy="date"
                sortOrder={sortOrder}
                onSortOrder={handleSort}
                selectedSortBy={selectedSortBy}
              />
            </th>
            <th>
              Ride{" "}
              <SortChevron
                sortBy="title"
                sortOrder={sortOrder}
                onSortOrder={handleSort}
                selectedSortBy={selectedSortBy}
              />
            </th>
            <th>
              Duration
              <SortChevron
                sortBy="duration"
                sortOrder={sortOrder}
                onSortOrder={handleSort}
                selectedSortBy={selectedSortBy}
              />
            </th>
            <th>
              Miles
              <SortChevron
                sortBy="miles"
                sortOrder={sortOrder}
                onSortOrder={handleSort}
                selectedSortBy={selectedSortBy}
              />
            </th>
            <th>
              Elevation
              <SortChevron
                sortBy="elevation"
                sortOrder={sortOrder}
                onSortOrder={handleSort}
                selectedSortBy={selectedSortBy}
              />
            </th>
          </tr>
        </thead>
        <tbody>{rideList}</tbody>
      </table>
      {rideList.length > 8 && (
        <button
          className="scrollToTop"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top <ArrowUpFromDot />
        </button>
      )}
    </>
  );
};

export default RideList;
