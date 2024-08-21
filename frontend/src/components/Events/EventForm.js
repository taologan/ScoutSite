import { useState, useEffect } from "react";

const EventForm = ({ eventToEdit, onFormSubmit }) => {
    const [name, setName] = useState("");
    const [eventCode, setEventCode] = useState("");
    const [scoutingFormID, setScoutingFormID] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (eventToEdit) {
            setName(eventToEdit.name);
            setEventCode(eventToEdit.event_code);
            setScoutingFormID(eventToEdit.scouting_form_id || "");
        } else {
            setName("");
            setEventCode("");
            setScoutingFormID("");
        }
    }, [eventToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = {
            name,
            event_code: eventCode,
            scouting_form_id: scoutingFormID || null
        };

        const response = await fetch(eventToEdit ? `http://localhost:4000/api/events/${eventToEdit.id}` : "http://localhost:4000/api/events", {
            method: eventToEdit ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });

        const json = await response.json();
        if (response.ok) {
            console.log(eventToEdit ? "Event updated successfully" : "Event created successfully");
            setName("");
            setEventCode("");
            setScoutingFormID("");
            onFormSubmit(json); // Pass the new or updated event back
        } else {
            setError(json.error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="eventCode" className="block text-gray-700 text-sm font-bold mb-2">Event Code:</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        id="eventCode"
                        value={eventCode}
                        onChange={(e) => setEventCode(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="scoutingFormId" className="block text-gray-700 text-sm font-bold mb-2">Scouting Form ID:</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        id="scoutingFormId"
                        value={scoutingFormID}
                        onChange={(e) => setScoutingFormID(e.target.value)}
                    />
                </div>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    {eventToEdit ? "Update Event" : "Create Event"}
                </button>
                {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default EventForm;