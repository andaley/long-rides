type TripHeaderProps = {
  selected: string;
  onSelectFilter: (year: string) => void;
};

const TripListHeader = (props: TripHeaderProps) => {
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSelectFilter(event.target.value);
  }

  return (
    <div>
      <h2>Trips</h2>
      <label>Year</label>
      <select value={props.selected} onChange={handleFilter}>
        <option>all</option>
        <option>2022</option>
        <option>2023</option>
        <option>2024</option>
      </select>
    </div>
  );
};

export default TripListHeader;
