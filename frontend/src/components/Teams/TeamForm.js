import { useState, useEffect } from "react";

const TeamForm = ({ teamToEdit, onFormSubmit }) => {
    const [teamNumber, setTeamNumber] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (teamToEdit) {
            setTeamNumber(teamToEdit.team_number);
        }
    }, [teamToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const team = { team_number: teamNumber };

        const response = await fetch(teamToEdit ? `http://localhost:4000/api/teams/${teamToEdit.id}` : "http://localhost:4000/api/teams", {
            method: teamToEdit ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(team),
        });

        const json = await response.json();
        if (response.ok) {
            console.log(teamToEdit ? "Team updated successfully" : "Team created successfully");
            setTeamNumber("");
            onFormSubmit(json);
        } else {
            setError(json.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="teamNumber" className="block text-sm font-medium text-gray-700">Team Number:</label>
                <input
                    type="text"
                    id="teamNumber"
                    value={teamNumber}
                    onChange={(e) => setTeamNumber(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {teamToEdit ? "Update Team" : "Create Team"}
            </button>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
    );
}

export default TeamForm;