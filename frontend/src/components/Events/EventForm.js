import {useState} from "react";
import {json} from "react-router-dom";
const EventForm = () => {
    const [name, setName] = useState("")
    const [eventCode, setEventCode] = useState("")
    const[scoutingFormID, setScoutingFormID] = useState("")
    const[error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const event = {name, event_code: eventCode, scouting_Form_ID: scoutingFormID}

        const response = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event)
        })
        const json = response.json()
        if (response.ok) {
            console.log("I CREATE EVENT AND IT WORKED")
            setName("")
            setEventCode("")
            setScoutingFormID("")
        } else {
            setError(json.error)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    class = "outline"
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
                    class = "outline"
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
                    class = "outline"
                    type="text"
                    id="scoutingFormId"
                    value={scoutingFormID}
                    onChange={(e) => setScoutingFormID(e.target.value)}
                />
            </div>
            <button class = "outline" type="submit">Create Event</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default EventForm
