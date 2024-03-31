import "./Trip.css";
import type { TripData } from "./TripList";

type TripProps = {
  key: number;
  trip: TripData;
};

function Trip(TripProps: TripProps) {
  const { date, title, duration, miles, elevation } = TripProps.trip || {};

  return (
    <>
      <div className="trip">
        <div>{date}</div>
        <h2>{title}</h2>
        <div>Duration: {duration}</div>
        <div>Miles: {miles}</div>
        <div>Elevation: {elevation}</div>
      </div>
    </>
  );
}

export default Trip;
