import useEvents from '../customHooks/useEvents';

const ListView = () => {
  const { events } = useEvents();

  return (
    <div className="list-view">
      <h1>Event List</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.start.toLocaleString()} to {event.end.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
