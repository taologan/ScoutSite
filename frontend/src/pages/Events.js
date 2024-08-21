import { useEffect, useState } from "react";
import EventForm from "../components/Events/EventForm";
import EventBlock from "../components/Events/EventBlock";

const Events = () => {
    const [events, setEvents] = useState(null);
    const [eventToEdit, setEventToEdit] = useState(null);

    const fetchEvents = async () => {
        const response = await fetch("http://localhost:4000/api/events");
        const json = await response.json();
        if (response.ok) {
            setEvents(json);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEdit = (event) => {
        setEventToEdit(event);
    };

    const handleFormSubmit = async (newEvent) => {
        if (newEvent) {
            if (eventToEdit) {
                setEvents(prevEvents => prevEvents.map(event =>
                    event.id === newEvent.id ? newEvent : event
                ));
            } else {
                setEvents(prevEvents => [...prevEvents, newEvent]);
            }
        } else {
            await fetchEvents();
        }
        setEventToEdit(null);
    };

    const handleDelete = (deletedEventId) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== deletedEventId));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold text-white text-center">Events</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create or Edit Event</h2>
                    <EventForm eventToEdit={eventToEdit} onFormSubmit={handleFormSubmit} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events && events.map((event) => (
                        <EventBlock
                            key={event.id}
                            eventDetails={event}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;