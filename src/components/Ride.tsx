import "./Ride.css";
import type { RideData } from "./RideList";
import type { SortByProperty } from "./consts/consts";

type RideProps = {
  key: number;
  ride: RideData;
  onClick: (ride: RideData) => void;
  isSelected: boolean;
  sortBy: SortByProperty;
};

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const formatDuration = (duration: number) =>
    `${Math.floor(duration / 3600)}:${Math.floor((duration % 3600) / 60)}`;
  const formatMiles = (miles: number) => `${Math.round(miles * 10) / 10} mi`;
  const formatElevation = (elevation: number) => `${Math.round(elevation)} ft`;

  function Ride(props: RideProps) {
    const { sortBy, isSelected, onClick, ride } = props;
    const { date, title, duration, miles, elevation } = ride;

    const formattedProps = {
      date: formatDate(date),
      duration: formatDuration(duration),
      miles: formatMiles(miles),
      elevation: formatElevation(elevation),
    };

    const handleClick = () => {
      onClick(ride);
    };

    const sortByMetric = () => {
      if (sortBy === "date") {
        return <p className="metricLabel">{formattedProps.date}</p>;
      } else {
        return (
          <>
            <div className="metricLabel">{sortBy}</div>
            <p className="metricValue">{formattedProps[sortBy]}</p>
          </>
        );
      }
    };

    const renderMetric = (label: string, value: string) => (
      <div>
        <span className="metricLabel">{label}</span>{" "}
        <span className="metricValue">{value}</span>
      </div>
    );

    return (
      <button
        className={`card ride ${isSelected ? "selected" : ""}`}
        onClick={handleClick}
      >
        <div className="rideContainer">
          <div className="rideContainer--left">
            <h2>{title}</h2>
            {sortBy !== "date" && (
              <p className="metricLabel">{formattedProps.date}</p>
            )}
            <div className="rideMetrics">
              {sortBy !== "duration" &&
                renderMetric("Duration", formattedProps.duration)}
              {sortBy !== "miles" &&
                renderMetric("Miles", formattedProps.miles)}
              {sortBy !== "elevation" &&
                renderMetric("Elevation", formattedProps.elevation)}
            </div>
          </div>
          <div className="rideContainer--right">{sortByMetric()}</div>
        </div>
      </button>
    );
  }

export default Ride;
