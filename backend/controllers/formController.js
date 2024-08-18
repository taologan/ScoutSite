const supabase = require("../config/supabaseClient");

const createForm = async (req, res) => {
    const { name, description } = req.body;
    try {
        const { error } = await supabase
            .from("scouting_forms")
            .insert({ name, description });
        if (error) throw error;
        res.status(200).json("Form configuration created successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const getForms = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("scouting_forms")
            .select();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const getFormById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("scouting_forms")
            .select()
            .eq('name', id)
            .single();
        if (error) throw error;
        if (!data) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const updateForm = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const { error } = await supabase
            .from("scouting_forms")
            .update({ name, description })
            .eq('id', id);
        if (error) throw error;
        res.status(200).json("Form configuration updated successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const deleteForm = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from("scouting_forms")
            .delete()
            .eq('id', id);
        if (error) throw error;
        res.status(200).json("Form configuration deleted successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

module.exports = {
    createForm,
    getForms,
    getFormById,
    updateForm,
    deleteForm
};
