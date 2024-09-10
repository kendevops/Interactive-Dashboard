import React, { useState } from "react";
import Modal from "react-modal";
import useEvents from "../customHooks/useEvents";
import { DateTime } from "luxon";
import styles from "../styles/EventModal.module.css";
import { Event as CalendarEvent } from "../types/EventTypes";

Modal.setAppElement("#root"); // Required for accessibility

interface EventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  eventToEdit?: any;
  onSave?: (event: CalendarEvent) => void;
}

const EventModal = ({
  isOpen,
  onRequestClose,
  eventToEdit,
}: EventModalProps) => {
  const { addEvent, editEvent } = useEvents();
  const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : "");
  const [start, setStart] = useState(
    eventToEdit ? eventToEdit.start.toISO() : ""
  );
  const [end, setEnd] = useState(eventToEdit ? eventToEdit.end.toISO() : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eventPayload = {
      id: eventToEdit ? eventToEdit.id : Date.now(),
      title,
      start: DateTime.fromISO(start),
      end: DateTime.fromISO(end),
    };

    if (eventToEdit) {
      editEvent(eventPayload);
    } else {
      addEvent(eventPayload);
    }

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={eventToEdit ? "Edit Event" : "Create Event"}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
    >
      <h2>{eventToEdit ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="start">Start Date</label>
          <input
            type="datetime-local"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="end">End Date</label>
          <input
            type="datetime-local"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default EventModal;
