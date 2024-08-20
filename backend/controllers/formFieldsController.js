const supabase = require("../config/supabaseClient");

const createFormField = async (req, res) => {
    const {
        field_label,
        field_type,
        field_options,
        required,
        display_order
    } = req.body;
    try {
        const { error } = await supabase
            .from("form_fields")
            .insert({
                scouting_form_id: null,
                field_label,
                field_type,
                field_options,
                required,
                display_order
            });
        if (error) throw error;
        res.status(200).json("Success");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const getFormFields = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("form_fields")
            .select();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const getFormFieldById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("form_fields")
            .select()
            .eq('scouting_form_id', id)
        if (error) throw error;
        if (!data) {
            return res.status(404).json({ message: "Form field not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const updateFormField = async (req, res) => {
    const { id } = req.params;
    const {
        field_label,
        field_type,
        field_options,
        required,
        display_order
    } = req.body;
    try {
        const { error } = await supabase
            .from("form_fields")
            .update({
                field_label,
                field_type,
                field_options,
                required,
                display_order
            })
            .eq('field_label', id);
        if (error) throw error;
        res.status(200).json("Form field updated successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

const deleteFormField = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from("form_fields")
            .delete()
            .eq('field_label', id);

        if (error) throw error;
        res.status(200).json("Form field deleted successfully");
    } catch (error) {
        res.status(400).json("Error: " + error.message);
    }
};

module.exports = {
    createFormField,
    getFormFields,
    getFormFieldById,
    updateFormField,
    deleteFormField
};
