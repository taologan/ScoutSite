const supabase = require("../config/supabaseClient");

const createScoutingData = async (req, res) => {
    const { scouting_form_id, event_id, team_id, data } = req.body;
    try {
        const { error } = await supabase
            .from("scouting_data")
            .insert({ scouting_form_id, event_id, team_id, data });
        if (error) throw error;
        res.status(200).json("Scouting data created successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const getScoutingData = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("scouting_data")
            .select();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json("Error :" + error.message);
    }
};

module.exports = {
    createScoutingData,
    getScoutingData
};