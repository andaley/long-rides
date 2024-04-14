import { useState } from "react";
import { TripData } from "./TripList";

type NewTripProps = {
  onSaveNewTrip: (newTrip: TripData) => void;
};

const NewTrip = (props: NewTripProps) => {
  const minDate = "2016-01-01"

  const [formState, setFormState] = useState({
    title: "",
    date: minDate,
    duration: 0,
    miles: 0,
    elevation: 0,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTrip = {
      ...formState,
      id: Math.floor(Math.random() * 1000),
    };

    props.onSaveNewTrip(newTrip);

    setFormState({
      title: "",
      date: minDate,
      duration: 0,
      miles: 0,
      elevation: 0,
    });
  };

  return (
    <div>
      <h1>New Trip</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            onChange={handleFormChange}
            value={formState.title}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            min={minDate}
            onChange={handleFormChange}
            value={formState.date}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            id="duration"
            onChange={handleFormChange}
            value={formState.duration}
          />
        </div>
        <div>
          <label htmlFor="miles">Miles</label>
          <input
            type="number"
            id="miles"
            onChange={handleFormChange}
            value={formState.miles}
          />
        </div>
        <div>
          <label htmlFor="elevation">Elevation</label>
          <input
            type="number"
            id="elevation"
            onChange={handleFormChange}
            value={formState.elevation}
          />
        </div>
        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
};

export default NewTrip;
