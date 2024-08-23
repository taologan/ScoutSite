const supabase = require("../config/supabaseClient");

const createScoutingData = async (req, res) => {
    const { scouting_form_id, event_id, team_id,team_number, data } = req.body;
    try {
        console.log(team_number);
        const { error } = await supabase
            .from("scouting_data")
            .insert({ scouting_form_id, event_id, team_id, team_number, data });
        if (error) throw error;
        res.status(200).json("Scouting data created successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const getScoutingData = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("scouting_data")
            .select()
            .eq('event_id', id)
        if (error) throw error;
        if (!data) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json("Error:" + error.message);
        console.log(error.message)
    }
};

module.exports = {
    createScoutingData,
    getScoutingData
};