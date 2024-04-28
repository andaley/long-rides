import type { RideData } from "../components/RideList";
import type { LatLngTuple } from "leaflet";

export const getAverageLatLng = (ride: RideData) => {
  return ride.map
    .reduce(
      (acc, [lat, lng]) => {
        return [acc[0] + lat, acc[1] + lng];
      },
      [0, 0]
    )
    .map((coord) => coord / ride.map.length) as LatLngTuple;
};

export const PDX_COORDS = [45.5051, -122.675] as LatLngTuple;
