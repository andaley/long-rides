import './TripListHeader.css'
import { SortByProperty }  from './consts/consts'

type TripHeaderProps = {
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
  }

  const handleSortOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSortOrder(event.target.value);
  }

  return (
    <div>
      <h2>Trips</h2>
      <div className="tripListHeader">
        <label>Year: </label>
        <select value={props.selected} onChange={handleFilter}>
          <option>all</option>
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
        </select>
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
  );
};

export default TripListHeader;
