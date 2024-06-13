import "./Ride.css";
import type { RideData } from "./RideList";

type RideProps = {
  key: number;
  ride: RideData;
  onClick: (ride: RideData) => void;
  isSelected: boolean;
};

function Ride(props: RideProps) {
  const { date, title, duration, miles, elevation } = props.ride;

  const durationHoursAndMinutes = `${Math.floor(duration / 3600)}h ${Math.floor(
    (duration % 3600) / 60
  )}m`;

  const roundedMiles = Math.round(miles * 10) / 10;

  const roundedElevation = Math.round(elevation);

  const formattedDate = new Date(date).toLocaleDateString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleClick = () => {
    props.onClick(props.ride);
  };

  return (
    <tr
      className={props.isSelected ? "ride--selected" : "ride"}
      onClick={handleClick}
    >
      <td>{formattedDate}</td>
      <td>{title}</td>
      <td>{durationHoursAndMinutes}</td>
      <td>{roundedMiles}</td>
      <td>{roundedElevation}</td>
    </tr>
  );
}

export default Ride;
