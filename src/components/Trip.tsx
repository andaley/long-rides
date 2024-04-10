import "./Trip.css";
import Card from "./Card";
import type { TripData } from "./TripList";

type TripProps = {
  key: number;
  trip: TripData;
};

function Trip(TripProps: TripProps) {
  const { date, title, duration, miles, elevation } = TripProps.trip || {};

  return (
    <>
      <Card className="trip">
        <div>{date}</div>
        <h2>{title}</h2>
        <div>Duration: {duration}</div>
        <div>Miles: {miles}</div>
        <div>Elevation: {elevation}</div>
      </Card>
    </>
  );
}

export default Trip;
