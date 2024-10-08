﻿const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const events = require('./routes/events')
const form = require('./routes/forms')
const teams = require('./routes/teams')
const fields = require('./routes/formFields')
const data = require('./routes/data')
const supabase = require('./config/supabaseClient')

app.use(cors())
app.use(express.json())
app.use((req, res, next) =>
{
    console.log(req.path, req.method);
    next()
})

app.use('/api/events', events) 
app.use('/api/forms', form)
app.use('/api/teams', teams)
app.use('/api/fields', fields)
app.use('/api/data', data)

app.get('/', (req, res) => {
    res.json({message: "Welcome"})
})

app.listen(process.env.PORT, () =>
{
    console.log('using port', process.env.PORT)
    // console.log(supabase)
})