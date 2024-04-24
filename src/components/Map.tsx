import "./Map.css";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import Card from "./Card";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
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
    const isSelected = props.selectedRide?.id === ride.id;
    const color = isSelected ? "red" : "blue";

    return (
      <Polyline key={`${i}-${color}`} positions={ride.map} color={color} />
    );
  });

  const center = useMemo(() => {
    if (filteredRides.length === 0) {
      const PDX_COORDS = [45.5051, -122.675] as LatLngTuple;
      return PDX_COORDS;
    }

    if (selectedRide === null) {
      const firstRideCoords = filteredRides[0].map[0];
      return firstRideCoords;
    }

    return selectedRide?.map[0];
  }, [selectedRide, filteredRides]);

  return (
    <Card className="map">
      <MapContainer center={center} zoom={10} scrollWheelZoom={false}>
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
