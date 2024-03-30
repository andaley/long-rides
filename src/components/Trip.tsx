import { useState } from "react";

function Trip() {
  const [dates] = useState("March 30, 2024");
  const [title] = useState("Frog Lake Loop");
  const [duration] = useState(0);
  const [miles] = useState(0);
  const [elevation] = useState(0);

  return (
    <>
      <div>{dates}</div>
      <h2>{title}</h2>
      <div>Duration: {duration}</div>
      <div>Miles: {miles}</div>
      <div>Elevation: {elevation}</div>
    </>
  );
}

export default Trip;
