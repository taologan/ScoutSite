import { useState } from "react";
import { Link } from "react-router-dom";

const EventBlock = ({ eventDetails, onEdit, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/events/${eventDetails.id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                onDelete(eventDetails.id); // Call the onDelete function passed from the parent
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to delete event");
            }
        } catch (error) {
            setError("An error occurred while deleting the event");
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{eventDetails.name}</h2>
            <p className="text-gray-600 mb-2">Event Code: {eventDetails.event_code}</p>
            <p className="text-gray-600 mb-4">Scouting Form ID: {eventDetails.scouting_form_id || "N/A"}</p>
            <div className="flex space-x-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    onClick={() => onEdit(eventDetails)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <Link
                    to={`/event-input/${eventDetails.scouting_form_id}`}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                    Go to Event Input
                </Link>
            </div>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
    );
};

export default EventBlock;