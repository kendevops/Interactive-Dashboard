// components/CalendarView.tsx
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import useEvents from '../customHooks/useEvents';
import EventModal from './EventModal';
import { DateTime } from 'luxon';
import { Event } from '../types/EventTypes'; // Import your Event type
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from '../styles/CalendarView.module.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { events, addEvent, updateEvent } = useEvents();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    // Create a new event structure here when slot is selected
    const newEvent: Event = {
      id: Math.random(), // Replace with better ID generation
      title: '',
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
      updateEvent(event.id, event);
    } else {
      addEvent(event);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={styles.calendarView}>
      <Calendar
        localizer={localizer}
        events={events.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
        }))}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent as any} // Type cast if necessary
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
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
