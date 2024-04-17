import { useMemo } from "react";
import "./Map.css";
import 'leaflet/dist/leaflet.css';
import Card from "./Card";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

interface MapProps {
  polylines: LatLngExpression[][];
}

const PDX_COORDS = [45.5051, -122.675];

function Map(props: MapProps) {
  const { polylines } = props;

  const center = useMemo(() => {
    if (polylines.length === 0) {
      return PDX_COORDS;
    }

    const firstPolyline = polylines[0];
    const firstPoint = firstPolyline[0];
    return firstPoint;
  }, [polylines]);

  return (
    <Card className="map">
      <MapContainer center={center} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {polylines.map((line, i) => (
          <Polyline key={i} positions={line} />
        ))}
      </MapContainer>
    </Card>
  );
}

export default Map;
