import "./Map.css";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import Card from "./Card";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { getAverageLatLng, PDX_COORDS } from "../utils/get-average-lat-lng";
import type { RideData } from "./RideList";
import type { LatLngTuple } from "leaflet";

const ChangeMapView = ({ center }: { center: LatLngTuple | undefined }) => {
  const map = useMap();

  if (center) {
    map.setView(center, map.getZoom());
  }
  return null;
};
interface MapProps {
  selectedRide: RideData | null;
  filteredRides: RideData[];
}

function Map(props: MapProps) {
  const { filteredRides, selectedRide } = props;

  const polylines = filteredRides.map((ride, i) => {
    const isSelected = selectedRide?.id === ride.id;
    const color = isSelected ? "#cf2e2e" : "#64727e";
    const weight = isSelected ? 5 : 3;

    return (
      <Polyline
        key={`${i}-${color}`}
        positions={ride.map}
        color={color}
        weight={weight}
      />
    );
  });

  const center = useMemo(() => {
    if (filteredRides.length === 0) {
      return PDX_COORDS;
    }

    return selectedRide === null ? getAverageLatLng(filteredRides) : getAverageLatLng([selectedRide]);
  }, [selectedRide, filteredRides]);

  return (
    <Card className="map">
      <MapContainer center={center} zoom={10.5} scrollWheelZoom={false}>
        <ChangeMapView center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {polylines}
      </MapContainer>
    </Card>
  );
}

export default Map;
