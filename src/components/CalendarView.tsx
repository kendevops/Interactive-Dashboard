// components/CalendarView.tsx
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import useEvents from "../customHooks/useEvents";
import EventModal from "./EventModal";
import { DateTime } from "luxon";
import { Event } from "../types/EventTypes"; // Import your Event type
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "../styles/CalendarView.module.css";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { events, addEvent, updateEvent } = useEvents();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Convert Luxon DateTime to native JavaScript Date for the calendar
  const toNativeDate = (dateTime: DateTime) => dateTime.toJSDate();

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    const newEvent: Event = {
      id: DateTime.now().toMillis(), // Replace with a better ID generation strategy if needed
      title: "",
      start: DateTime.fromJSDate(slotInfo.start),
      end: DateTime.fromJSDate(slotInfo.end),
    };
    setSelectedEvent(newEvent);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleEventSave = (event: Event) => {
    if (selectedEvent && selectedEvent.id) {
      updateEvent(selectedEvent.id, event);
    } else {
      addEvent(event);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={styles.calendarView}>
      <h1>Event Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events.map((event) => ({
          id: event.id,
          title: event.title,
          start: toNativeDate(event.start),
          end: toNativeDate(event.end),
        }))}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent as any}
        style={{ height: "80vh" }}
        views={["month", "week", "day"]}
      />
      {isModalOpen && selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          eventToEdit={selectedEvent}
          onSave={handleEventSave}
        />
      )}
    </div>
  );
};

export default CalendarView;
