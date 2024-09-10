import React, { createContext, useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Event } from '../types/EventTypes';



interface EventContextProps {
  events: Event[];
  addEvent: (event: Event) => void;
  editEvent: (event: Event) => void;
  updateEvent: (id: number | string, updateEvent: Event) => void;
  deleteEvent: (id: number | string) => void;
}

export const EventContext = createContext<EventContextProps | undefined>(undefined);


export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from local storage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(
        JSON.parse(storedEvents).map((event: any) => ({
          ...event,
          start: DateTime.fromISO(event.start),
          end: DateTime.fromISO(event.end),
        }))
      );
    }
  }, []);

  // Save events to local storage on change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  const editEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const updateEvent = (id: number | string, updatedEvent: Event) => {
    setEvents(
      events.map((event) => {
        if (event.id === id) {
          return { ...event, ...updatedEvent };
        }
        return event;
      })
    );
  };

  const deleteEvent = (id: number | string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <EventContext.Provider
      value={{ events, addEvent, editEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};
