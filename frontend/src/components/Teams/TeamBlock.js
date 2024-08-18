import { useState } from "react";

const TeamBlock = ({ teamDetails: team_number, onEdit }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:4000/api/teams/${team_number.id}`, {
            method: "DELETE",
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
    };

    return (
        <div className="flex rounded border-2">
            <h2>Team {team_number.team_number}</h2>
            <button type="button" onClick={() => onEdit(team_number)}>Edit</button>
            <button type="submit" onClick={handleDelete}>Delete</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default TeamBlock;