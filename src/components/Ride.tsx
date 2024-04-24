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
    console.log("Ride clicked", props.ride);
    props.onClick(props.ride);
  };


  return (
      <Card className={props.isSelected ? "ride--selected" : "ride"} onClick={handleClick}>
        <div>{formattedDate}</div>
        <h2>{title}</h2>
        <div>Duration: {durationHoursAndMinutes}</div>
        <div>Miles: {roundedMiles}</div>
        <div>Elevation: {roundedElevation}</div>
      </Card>
  );
}

export default Ride;
