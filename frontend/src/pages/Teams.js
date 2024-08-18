import { useEffect, useState } from "react";
import TeamForm from "../components/Teams/TeamForm";
import TeamBlock from "../components/Teams/TeamBlock";

const Teams = () => {
    const [teams, setTeams] = useState(null);
    const [teamToEdit, setTeamToEdit] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch("http://localhost:4000/api/teams");
            const json = await response.json();
            if (response.ok) {
                setTeams(json);
            }
        };
        fetchTeams();
    }, []);

    const handleEdit = (team) => {
        setTeamToEdit(team);
    };

    const handleFormSubmit = () => {
        setTeamToEdit(null);
    };

    return (
        <div className="Teams">
            <h1>TEAMS</h1>
            <TeamForm teamToEdit={teamToEdit} onFormSubmit={handleFormSubmit} />
            {teams && teams.map((team) => (
                <TeamBlock key={team.id} teamDetails={team} onEdit={handleEdit} />
            ))}
        </div>
    );
};

export default Teams;