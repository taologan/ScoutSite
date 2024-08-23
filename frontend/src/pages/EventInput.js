import {useParams} from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import InputField from "../components/Fields/InputField";

function EventInput() {
    const { formId } = useParams();
    const [fields, setFields] = useState(null);
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [teamInput, setTeamInput] = useState("");
    const [teamNumber, setTeamNumber] = useState("");
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/events/${formId}`);
                const json = await response.json();
                if (response.ok) {
                    setEventDetails(json);
                    if (json && json.scouting_form_id) {
                        const fieldsResponse = await fetch(`http://localhost:4000/api/fields/${json.scouting_form_id}`);
                        const fieldsJson = await fieldsResponse.json();
                        if (fieldsResponse.ok) {
                            setFields(fieldsJson);
                        } else {
                            console.error("Failed to fetch fields:", fieldsJson);
                        }
                    }
                } else {
                    console.error("Failed to fetch event details:", json);
                }
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };

        const fetchTeams = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/teams");
                const json = await response.json();
                if (response.ok) {
                    setTeams(json);
                    setFilteredTeams(json);
                } else {
                    console.error("Failed to fetch teams:", json);
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchEventDetails();
        fetchTeams();
    }, [formId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleTeamInputChange = (e) => {
        const input = e.target.value;
        setTeamInput(input);
        setShowDropdown(true);

        const filtered = teams.filter(team =>
            team.team_number.toString().includes(input)
        );
        setFilteredTeams(filtered);
    };

    const handleTeamSelect = (team) => {
        setSelectedTeam(team.id);
        setTeamInput(team.team_number.toString());
        console.log(teamInput)
        setTeamNumber(team.team_number.toString());
        console.log(teamNumber)
        setShowDropdown(false);
    };

    const handleInputChange = (fieldId, fieldLabel, value) => {
        setFormData(prevData => ({
            ...prevData,
            [fieldLabel]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedTeam) {
            setError("Please select a team");
            return;
        }

        const scoutingData = {
            scouting_form_id: eventDetails.scouting_form_id,
            event_id: formId,
            team_id: selectedTeam,
            team_number: teamNumber,
            data: formData
        };

        try {
            const response = await fetch("http://localhost:4000/api/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(scoutingData),
            });

            if (response.ok) {
                console.log("Scouting data saved successfully");
                setFormData({});
                setSelectedTeam("");
                setTeamInput("");
                setTeamNumber("");
                setError(null);
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to save scouting data");
            }
        } catch (error) {
            setError("An error occurred while saving the data");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold text-white text-center">Event Input Form</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                {/*<div className="container mx-auto px-4 py-8">*/}
                {/*    {eventDetails && (*/}
                {/*        <div className="mb-8">*/}
                {/*            <EventBlock*/}
                {/*                eventDetails={eventDetails}*/}
                {/*                onEdit={() => {}}*/}
                {/*                onDelete={() => {}}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    )} </div>*/}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Form ID: {formId}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mb-4 relative" ref={dropdownRef}>
                            <label htmlFor="teamInput" className="block text-sm font-medium text-gray-700">Select Team:</label>
                            <input
                                id="teamInput"
                                type="text"
                                value={teamInput}
                                onChange={handleTeamInputChange}
                                onFocus={() => setShowDropdown(true)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter team number"
                            />
                            {showDropdown && filteredTeams.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {filteredTeams.map(team => (
                                        <li
                                            key={team.id}
                                            onClick={() => handleTeamSelect(team)}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {team.team_number}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {fields && fields.map((field) => (
                            <InputField
                                key={field.id}
                                fieldDetails={field}
                                value={formData[field.field_label] || ""}
                                onChange={(value) => handleInputChange(field.id, field.field_label, value)}
                            />
                        ))}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default EventInput;