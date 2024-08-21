import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import InputField from "../components/Fields/InputField";

function EventInput() {
    const { formId } = useParams();
    const [fields, setFields] = useState(null);
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [teamInput, setTeamInput] = useState("");
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchFields = async () => {
            const response = await fetch(`http://localhost:4000/api/fields/${formId}`);
            const json = await response.json();
            if (response.ok) {
                setFields(json);
            }
        };

        const fetchTeams = async () => {
            const response = await fetch("http://localhost:4000/api/teams");
            const json = await response.json();
            if (response.ok) {
                setTeams(json);
                setFilteredTeams(json);
            }
        };

        fetchFields();
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
            scouting_form_id: formId,
            event_id: null, // You might want to add event selection as well
            team_id: selectedTeam,
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