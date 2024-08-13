import {useState} from "react";

const EventBlock = ({ eventDetails }) => {
    const[error, setError] = useState(null)
    const handleDelete = async () => {
        
        const response = await fetch(`/api/events/${eventDetails.id}`, {
            method: "DELETE",
        });
        const json = response.json()
        if (!response.ok) {
            setError(json.error)
        }
    }
    
    return (
        <div class="flex, rounded, border-2">
            <h2>{eventDetails.name}</h2>
            <h3>{eventDetails.event_code}</h3>
            <h3>{eventDetails.scouting_form_id}</h3>
            <button type={"submit"} onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default  EventBlock