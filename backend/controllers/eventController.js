const supabase = require("../config/supabaseClient");

const createEvent = async (req, res) => {
    const { name, event_code, scouting_form_id } = req.body;
    try {
        const { error } = await supabase
            .from("events")
            .insert({ name, event_code, scouting_form_id });
        if (error) throw error;
        console.log("Post Success");
        res.status(200).json("Success");
    } catch (error) {
        res.status(400).json("Error:" + error.message);
    }
};

const getEvents = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("events")
            .select();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json("Error:" + error.message);
    }
};

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("events")
            .select()
            .eq('name', id)
            .single();
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

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, event_code, scouting_form_id } = req.body;
    try {
        const { error } = await supabase
            .from("events")
            .update({ name, event_code, scouting_form_id })
            .eq('name', id);
        if (error) throw error;
        res.status(200).json("Event updated successfully");
    } catch (error) {
        res.status(400).json("Error:" + error.message);
        console.log(error.message)
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from("events")
            .delete()
            .eq('id', id);
        if (error) throw error;
        res.status(200).json("Event deleted successfully");
    } catch (error) {
        res.status(400).json("Error:" + error.message);
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
