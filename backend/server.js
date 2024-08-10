const express = require('express')
require('dotenv').config()

const app = express()
const events = require('./routes/events')
const supabase = require('./config/supabaseClient')

app.use(express.json())
app.use((req, res, next) =>
{
    console.log(req.path, req.method);
    next()
})

app.use('/api/events', events)
app.get('/', (req, res) => {
    res.json({message: "Welcome"})
})

app.listen(process.env.PORT, () =>
{
    console.log('using port', process.env.PORT)
    console.log(supabase)
})