import "./Ride.css";
import Card from "./Card";
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

  const formattedDate = new Date(date).toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" });

  const handleClick = () => {
    props.onClick(props.ride);
  };


  return (
    <Card
      className={props.isSelected ? "ride--selected" : "ride"}
      onClick={handleClick}
    >
      <div className="rideHeader">
        <h2>{title}</h2>
        <p className="date">{formattedDate}</p>
      </div>
      <div>Duration: {durationHoursAndMinutes}</div>
      <div>Miles: {roundedMiles}</div>
      <div>Elevation: {roundedElevation} ft.</div>
    </Card>
  );
}

export default Ride;
