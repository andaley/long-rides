import "./Stats.css";
import type { RideData } from "./RideList";

interface StatsProps {
  rides: RideData[];
}

export const Stats = ({ rides }: StatsProps) => {
  const totalRides = rides.length;
  const totalMiles = rides.reduce((acc, ride) => acc + ride.miles, 0);
  const totalElevation = rides.reduce((acc, ride) => acc + ride.elevation, 0);
  const averageMiles = totalMiles / totalRides;
  const averageElevation = totalElevation / totalRides;

  return (
    <>
      <h3>Totals</h3>
      <div className="card stats">
        <p>total rides: {totalRides.toLocaleString()}</p>
        <p>total miles: {Math.round(totalMiles).toLocaleString()}</p>
        <p>total elevation: {Math.round(totalElevation).toLocaleString()}</p>
        <p>avg. miles: {Math.round(averageMiles).toLocaleString()}</p>
        <p>avg. elevation: {Math.round(averageElevation).toLocaleString()}</p>
      </div>
    </>
  );
};

export default Stats;
