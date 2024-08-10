const express = require('express')
const supabase = require('../config/supabaseClient')

const router = express.Router()
const fetchData = async () => {
    const {data, error} = await supabase
        .from("test")
        .select()
    return data
}


router.get('/', async (req, res) => {
    res.json({ message: 'Get all events!' })
    try {
        console.log(await fetchData())
    } catch (error) {
        console.error(error)
    }
})

router.get('/:id', (req, res) => {
    res.json({ message: 'Get event ID!' })
})

router.post('/', (req, res) => {
    res.json({ message: 'Add event' })
})

router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete event' })
})

router.patch('/:id', (req, res) => {
    res.json({ message: 'Update event' })
})

module.exports = router