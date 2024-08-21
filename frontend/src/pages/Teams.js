import { useEffect, useState } from "react";
import TeamForm from "../components/Teams/TeamForm";
import TeamBlock from "../components/Teams/TeamBlock";

const Teams = () => {
    const [teams, setTeams] = useState(null);
    const [teamToEdit, setTeamToEdit] = useState(null);

    const fetchTeams = async () => {
        const response = await fetch("http://localhost:4000/api/teams");
        const json = await response.json();
        if (response.ok) {
            setTeams(json);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const handleEdit = (team) => {
        setTeamToEdit(team);
    };

    const handleFormSubmit = async (newTeam) => {
        await fetchTeams();
        setTeamToEdit(null);
    };

    const handleDelete = (deletedTeamId) => {
        setTeams(prevTeams => prevTeams.filter(team => team.id !== deletedTeamId));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold text-white text-center">Teams</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create or Edit Team</h2>
                    <TeamForm teamToEdit={teamToEdit} onFormSubmit={handleFormSubmit} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams && teams.map((team) => (
                        <TeamBlock
                            key={team.id}
                            teamDetails={team}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Teams;