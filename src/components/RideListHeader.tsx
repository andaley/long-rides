import "./RideListHeader.css";

type RideListHeaderProps = {
  filterOptions: string[];
  selected: string;
  onSelectFilter: (year: string) => void;
};

const RideListHeader = (props: RideListHeaderProps) => {
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSelectFilter(event.target.value);
  };

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
    </section>
  );
};

export default RideListHeader;
