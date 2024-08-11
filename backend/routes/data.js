const express = require('express');
const {
    createScoutingData,
    getScoutingData
} = require("../controllers/dataController");

const router = express.Router();

router.post('/', createScoutingData);
router.get('/', getScoutingData);

module.exports = router;