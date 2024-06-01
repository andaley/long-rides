import "./Map.css";
import "leaflet/dist/leaflet.css";
import { useMemo, useEffect } from "react";
import Card from "./Card";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import type { RideData } from "./RideList";
import type { LatLngTuple, LatLngBoundsExpression } from "leaflet";

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

  const bounds = useMemo(() => {
    if (filteredRides.length === 0) {
      const PDX_COORDS = [45.5051, -122.675] as LatLngTuple;
      return [PDX_COORDS];
    }

    return selectedRide
      ? selectedRide.map
      : filteredRides.flatMap((ride) => ride.map);
  }, [filteredRides, selectedRide]);

  return (
    <section>
      <Card className="map">
        <MapContainer scrollWheelZoom={false} aria-label="Interactive map showing bike ride routes">
          <ChangeMapView bounds={bounds} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {polylines}
        </MapContainer>
      </Card>
    </section>
  );
}

const ChangeMapView = ({ bounds }: { bounds: LatLngBoundsExpression }) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds);
  }, [bounds, map]);

  return null;
};

export default Map;
