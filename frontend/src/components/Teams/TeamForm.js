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
            onFormSubmit();
        } else {
            setError(json.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="teamNumber">Team Number:</label>
                <input
                    className="outline"
                    type="text"
                    id="teamNumber"
                    value={teamNumber}
                    onChange={(e) => setTeamNumber(e.target.value)}
                    required
                />
            </div>
            <button className="outline" type="submit">
                {teamToEdit ? "Update Team" : "Create Team"}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default TeamForm;