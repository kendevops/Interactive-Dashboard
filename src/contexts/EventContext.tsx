import React, { createContext, useState, useEffect } from 'react';
import { DateTime } from 'luxon';

interface Event {
  id: number;
  title: string;
  start: DateTime;
  end: DateTime;
}

interface EventContextProps {
  events: Event[];
  addEvent: (event: Event) => void;
  editEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
}

export const EventContext = createContext<EventContextProps | undefined>(undefined);


export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from local storage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents).map((event: any) => ({
        ...event,
        start: DateTime.fromISO(event.start),
        end: DateTime.fromISO(event.end),
      })));
    }
  }, []);

  // Save events to local storage on change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  const editEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
