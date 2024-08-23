const express = require('express');
const {
    createScoutingData,
    getScoutingData
} = require("../controllers/dataController");

const router = express.Router();

router.post('/', createScoutingData);
router.get('/:id', getScoutingData);

module.exports = router;