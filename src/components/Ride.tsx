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

    const sortByMetric = () => (
      <div className="sortByMetric">
        {sortBy === "date" ? (
          <p className="statLabel">{formattedProps.date}</p>
        ) : (
          <>
            <div className="sortByMetricLabel">{sortBy}</div>
            <p className="sortByMetricValue">{formattedProps[sortBy]}</p>
          </>
        )}
      </div>
    );

    const renderMetric = (label: string, value: string) => (
      <div>
        <span className="statLabel">{label}</span>{" "}
        <span className="statValue">{value}</span>
      </div>
    );

    return (
      <button
        className={isSelected ? "card ride selected" : "card ride"}
        onClick={handleClick}
      >
        <div className="rideHeader">
          <div className="rideStats">
            <h2>{title}</h2>
            {sortBy !== "date" && (
              <p className="statLabel">{formattedProps.date}</p>
            )}
            <div className="rideStatsValues">
              {sortBy !== "duration" &&
                renderMetric("Duration", formattedProps.duration)}
              {sortBy !== "miles" &&
                renderMetric("Miles", formattedProps.miles)}
              {sortBy !== "elevation" &&
                renderMetric("Elevation", formattedProps.elevation)}
            </div>
          </div>
          {sortByMetric()}
        </div>
      </button>
    );
  }

export default Ride;
