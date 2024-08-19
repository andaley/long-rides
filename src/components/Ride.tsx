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

  const formattedProps = {
    date: formattedDate,
    duration: durationHoursAndMinutes,
    miles: `${roundedMiles} mi`,
    elevation: `${roundedElevation} ft.`,
  };

  const handleClick = () => {
    props.onClick(props.ride);
  };

  return (
    <button
      className={props.isSelected ? "card ride selected" : "card ride"}
      onClick={handleClick}
    >
      <div className="rideHeader">
        <div className="rideStats">
          <h2>{title}</h2>
          {props.sortBy !== "date" && (
            <p className="statLabel">{formattedDate}</p>
          )}
          <div className="rideStatsValues">
            {props.sortBy !== "duration" && (
              <div>
                <span className="statLabel">Duration</span>{" "}
                {durationHoursAndMinutes}
              </div>
            )}
            {props.sortBy !== "miles" && (
              <div>
                <span className="statLabel">Distance</span>{" "}
                {formattedProps["miles"]}
              </div>
            )}
            {props.sortBy !== "elevation" && (
              <div>
                <span className="statLabel">Elevation</span>{" "}
                {formattedProps["elevation"]}
              </div>
            )}
          </div>
        </div>
        <div className="sortByStat">
          <div className="sortByStatLabel">{props.sortBy}</div>
          <p className="sortByStatValue">{formattedProps[props.sortBy]}</p>
        </div>
      </div>
    </button>
  );
}

export default Ride;
