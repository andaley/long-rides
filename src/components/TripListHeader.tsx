import "./TripListHeader.css";
import { SortByProperty } from "./consts/consts";

type TripHeaderProps = {
  filterOptions: string[];
  selected: string;
  onSelectFilter: (year: string) => void;
  sortBy: SortByProperty;
  onSortBy: (sortProperty: SortByProperty) => void;
  sortOrder: string;
  onSortOrder: (sortOrder: string) => void;
};

const TripListHeader = (props: TripHeaderProps) => {
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSelectFilter(event.target.value);
  };

  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSortBy(event.target.value as SortByProperty);
  };

  const handleSortOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSortOrder(event.target.value);
  };

  const filterOptions = props.filterOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
 
  return (
    <>
      <div className="tripListHeader">
        <div className="filterBy">
          <label>Year: </label>
          <select value={props.selected} onChange={handleFilter}>
            {filterOptions}
          </select>
        </div>
        <div className="sortBy">
          <label>Sort: </label>
          <select value={props.sortBy} onChange={handleSortBy}>
            <option value="date">Date</option>
            <option value="duration">Duration</option>
            <option value="miles">Miles</option>
            <option value="elevation">Elevation</option>
          </select>
          <label>Order:</label>
          <select value={props.sortOrder} onChange={handleSortOrder}>
            <option value="ascending">ascending</option>
            <option value="descending">descending</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default TripListHeader;
