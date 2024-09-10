import { useState } from "react";
import useEvents from "../customHooks/useEvents"; // Import the useEvents custom hook
import EventModal from "./EventModal";
import { Event } from "../types/EventTypes";
import styles from "../styles/ListView.module.css";


const ListView = () => {
  const { events, deleteEvent } = useEvents(); // Use the custom hook to access events and functions
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const handleOpenModal = (event: Event | null = null) => {
    setCurrentEvent(event); // Set to null for new event or pass the existing event for editing
    setIsModalOpen(true);
  };

  return (
    <div className={styles.listView}>
      <h1>Event List</h1>
      <button onClick={() => handleOpenModal()}>Create Event</button>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> -{" "}
            <span className="">
              {event.start.toLocaleString()} to {event.end.toLocaleString()}
            </span>
            <button onClick={() => handleOpenModal(event)}>Edit</button>
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          eventToEdit={currentEvent}
        />
      )}
    </div>
  );
};

export default ListView;
