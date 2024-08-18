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
            onFormSubmit();
        } else {
            setError(json.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    className="outline"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="eventCode">Event Code:</label>
                <input
                    className="outline"
                    type="text"
                    id="eventCode"
                    value={eventCode}
                    onChange={(e) => setEventCode(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="scoutingFormId">Scouting Form ID:</label>
                <input
                    className="outline"
                    type="text"
                    id="scoutingFormId"
                    value={scoutingFormID}
                    onChange={(e) => setScoutingFormID(e.target.value)}
                />
            </div>
            <button className="outline" type="submit">
                {eventToEdit ? "Update Event" : "Create Event"}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default EventForm;