import { useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./RideListHeader.css";
import { SortByProperty } from "./consts/consts";

type RideListHeaderProps = {
  filterOptions: string[];
  selected: string;
  onSelectFilter: (year: string) => void;
  sortBy: SortByProperty;
  onSortBy: (sortProperty: SortByProperty) => void;
  sortOrder: string;
  onSortOrder: (sortOrder: string) => void;
};

const RideListHeader = (props: RideListHeaderProps) => {
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSelectFilter(event.target.value);
  };

  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSortBy(event.target.value as SortByProperty);
  };

  const handleSortOrder = useCallback(
    (val: "ascending" | "descending") => {
      props.onSortOrder(val);
    },
    [props]
  );

  const filterOptions = props.filterOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <section className="rideListHeader">
      <nav className="filterBy" aria-label="Filter by property">
        <label htmlFor="yearSelect">Year: </label>
        <select id="yearSelect" value={props.selected} onChange={handleFilter}>
          {filterOptions}
        </select>
      </nav>
      <nav className="sortBy" aria-label="Sort by property">
        <label htmlFor="sortSelect">Sort: </label>
        <select id="sortSelect" value={props.sortBy} onChange={handleSortBy}>
          <option value="date">Date</option>
          <option value="duration">Duration</option>
          <option value="miles">Miles</option>
          <option value="elevation">Elevation</option>
        </select>
        {props.sortOrder === "ascending" ? (
          <ChevronUp
            onClick={() => handleSortOrder("descending")}
            role="button"
            aria-label="sort rides in descending order"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === "ArrowDown") &&
              handleSortOrder("descending")
            }
          />
        ) : (
          <ChevronDown
            onClick={() => handleSortOrder("ascending")}
            role="button"
            aria-label="sort rides in ascending order"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === "ArrowUp") &&
              handleSortOrder("ascending")
            }
          />
        )}
      </nav>
    </section>
  );
};

export default RideListHeader;
