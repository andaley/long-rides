import type { RideData } from "../components/RideList";
import type { LatLngTuple } from "leaflet";

// calculates the average latitude and longitude of a single ride or array of rides.
// uses the  Median Absolute Deviation (MAD) method to identify and remove outliers before calculating the average.
export const getAverageLatLng = (rides: RideData[]) => {
  const coords = rides.flatMap((ride) => ride.map);

  const medianLat = median(coords.map(([lat]) => lat));
  const medianLng = median(coords.map(([, lng]) => lng));

  const madLat = mad(coords.map(([lat]) => lat));
  const madLng = mad(coords.map(([, lng]) => lng));

  const filteredCoords = coords.filter(([lat, lng]) => {
    return (
      Math.abs(lat - medianLat) <= 2 * madLat &&
      Math.abs(lng - medianLng) <= 2 * madLng
    );
  });

  const totalLat = filteredCoords.reduce((total, [lat]) => total + lat, 0);
  const totalLng = filteredCoords.reduce((total, [, lng]) => total + lng, 0);

  const averageLat = totalLat / filteredCoords.length;
  const averageLng = totalLng / filteredCoords.length;

  return [averageLat, averageLng] as LatLngTuple;
};

const median = (values: number[]): number => {
  values.sort((a, b) => a - b);
  const half = Math.floor(values.length / 2);
  return values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2;
};

const mad = (values: number[]): number => {
  const med = median(values);
  const diffs = values.map((value) => Math.abs(value - med));
  return median(diffs);
};

export const PDX_COORDS = [45.5051, -122.675] as LatLngTuple;
