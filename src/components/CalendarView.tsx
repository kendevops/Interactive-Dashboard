import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import useEvents from '../customHooks/useEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup moment for date localization
const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { events } = useEvents();

  // Map events to react-big-calendar event format
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start.toJSDate(),
    end: event.end.toJSDate(),
  }));

  return (
    <div className="calendar-view">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
        defaultView="month"
      />
    </div>
  );
};

export default CalendarView;
