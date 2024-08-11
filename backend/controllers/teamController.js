const supabase = require("../config/supabaseClient");

const createTeam = async (req, res) => {
    const { team_number } = req.body;
    try {
        const { error } = await supabase
            .from("teams")
            .insert({ team_number });
        if (error) throw error;
        res.status(200).json("Team created successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const getTeams = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("teams")
            .select();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const getTeamById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("teams")
            .select()
            .eq('team_numbers', id)
            .single();
        if (error) throw error;
        if (!data) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { team_number } = req.body;
    try {
        const { error } = await supabase
            .from("teams")
            .update({ team_number })
            .eq('team_number', id);
        if (error) throw error;
        res.status(200).json("Team updated successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const deleteTeam = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from("teams")
            .delete()
            .eq('team_number', id);
        if (error) throw error;
        res.status(200).json("Team deleted successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

module.exports = {
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam
};
