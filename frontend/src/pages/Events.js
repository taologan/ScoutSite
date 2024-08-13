import {useEffect, useState} from "react";
import EventForm from "../components/Events/EventForm";
import EventBlock from "../components/Events/EventBlock";

const Events = () => {
    const[events, setEvents] = useState(null)
    
    useEffect(() => {
        const fetchEvents = async  () => {
            const response = await fetch("/api/events");
            const json = await response.json()
            if (response.ok) {
                setEvents(json)
            }
        }
        fetchEvents()
    }, [])
    
    
    return (
        <div className={"Events"}>
            <h1>EVENTS</h1>
            <EventForm/>
            {events && events.map((e) => (
                <EventBlock key = {e.id} eventDetails = {e}/>
            ))}
        </div>
    )
}

export default Events