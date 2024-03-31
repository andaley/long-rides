import { useState, useEffect } from "react";
import Trip from "./Trip";
import TripListHeader from "./TripListHeader";
import "./TripList.css";
import { SortByProperty } from "./consts/consts";

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
    return [
      {
        id: 1,
        date: "June 30, 2023",
        title: "Frog Lake Loop",
        duration: 1,
        miles: 36,
        elevation: 2500,
      },
      {
        id: 2,
        date: "April 15, 2024",
        title: "Three Sisters Wilderness",
        duration: 3,
        miles: 90,
        elevation: 4700,
      },
      {
        id: 3,
        date: "August 16, 2023",
        title: "Siletz River",
        duration: 5,
        miles: 120,
        elevation: 3700,
      },
      {
        id: 4,
        date: "May 5, 2022",
        title: "Fire and Ice",
        duration: 2,
        miles: 49,
        elevation: 3000,
      },
    ];
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
