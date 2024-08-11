const supabase = require("../config/supabaseClient")
const createEvent = async (req, res) => {
    const {req_name, req_event_code} = req.body
    try {
        const {error} = await supabase
            .from("events")
            .insert({name: req_name, event_code: req_event_code, scouting_form_id:null} )
        console.log("Post Success")
        res.status(200).json("Success")
    } catch (error) {
        res.status(400).json("Error")
    }
}

const getEvents = async (req, res) => {
    try {
        const {data, error} = await supabase
            .from("events")
            .select()
        res.status(200).json(data)
        return data
    } catch (error) {
        return res.status(400).json("error")
    }

  
}

module.exports = {
    getEvents, 
    createEvent
}