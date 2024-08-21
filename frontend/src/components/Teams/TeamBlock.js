import { useState } from "react";

const TeamBlock = ({ teamDetails: team_number, onEdit, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:4000/api/teams/${team_number.id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            onDelete(team_number.id);
        } else {
            const json = await response.json();
            setError(json.error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Team {team_number.team_number}</h2>
            <div className="flex space-x-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={() => onEdit(team_number)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
    );
};

export default TeamBlock;