import { useState } from "react";

const EventBlock = ({ eventDetails, onEdit }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        const response = await fetch(`/api/events/${eventDetails.id}`, {
            method: "DELETE",
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
    };

    return (
        <div className="flex rounded border-2">
            <h2>{eventDetails.name}</h2>
            <h3>{eventDetails.event_code}</h3>
            <h3>{eventDetails.scouting_form_id}</h3>
            <button type="button" onClick={() => onEdit(eventDetails)}>Edit</button>
            <button type="submit" onClick={handleDelete}>Delete</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default EventBlock;