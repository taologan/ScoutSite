const express = require('express')
const supabase = require('../config/supabaseClient')
const {
    createEvent,
    getEvents
} = require("../controllers/eventController")

const router = express.Router()
const fetchData = async () => {
    const {data, error} = await supabase
        .from("events")
        .select()
    return data
}


// router.get('/', async (req, res) => {
//     res.json({ message: 'Get all events!' })
//     let output
//     try {
//         output = await fetchData()
//     } catch (error) {
//         console.log(error)
//     }
//     console.log(output)
// })
router.get('/', getEvents)

router.get('/:id', (req, res) => {
    res.json({ message: 'Get event ID!' })
})

router.post('/', createEvent)

router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete event' })
})

router.patch('/:id', (req, res) => {
    res.json({ message: 'Update event' })
})

module.exports = router