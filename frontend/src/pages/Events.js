import { useEffect, useState } from "react";
import EventForm from "../components/Events/EventForm";
import EventBlock from "../components/Events/EventBlock";

const Events = () => {
    const [events, setEvents] = useState(null);
    const [eventToEdit, setEventToEdit] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch("/api/events");
            const json = await response.json();
            if (response.ok) {
                setEvents(json);
            }
        };
        fetchEvents();
    }, []);

    const handleEdit = (event) => {
        setEventToEdit(event);
    };

    const handleFormSubmit = () => {
        setEventToEdit(null);
    };

    return (
        <div className="Events">
            <h1>EVENTS</h1>
            <EventForm eventToEdit={eventToEdit} onFormSubmit={handleFormSubmit} />
            {events && events.map((e) => (
                <EventBlock key={e.id} eventDetails={e} onEdit={handleEdit} />
            ))}
        </div>
    );
};

export default Events;