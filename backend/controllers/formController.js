const supabase = require("../config/supabaseClient");

const createForm = async (req, res) => {
    const {req_name, req_desc } = req.body;
    try {
        const { error } = await supabase
            .from("scouting_forms")
            .insert({ name: req_name, description: req_desc});
        res.status(200).json("Form configuration created successfully");
    } catch (error) {
        res.status(400).json("Error creating form configuration");
    }
    
    // console.log("Form created")
    // res.status(200).json("created")
};

const getForm = async (req, res) => {
    // const { event_id } = req.params;
    // try {
    //     const { data, error } = await supabase
    //         .from("event_forms")
    //         .select("scouting_form_id")
    //         .eq("event_id", event_id);
    //     if (error) throw error;
    //     res.status(200).json(data);
    // } catch (error) {
    //     res.status(400).json("Error fetching form configuration");
    // }

    try {
        const {data, error} = await supabase
            .from("scouting_forms")
            .select()
        res.status(200).json(data)
        return data
    } catch (error) {
        return res.status(400).json("error")
    }
};

module.exports = {
    createForm,
    getForm
};