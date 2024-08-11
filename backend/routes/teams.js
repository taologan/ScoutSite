const express = require('express');
const {
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam
} = require("../controllers/teamController");

const router = express.Router();

router.get('/', getTeams);  // Get all teams
router.get('/:id', getTeamById);  // Get team by ID
router.post('/', createTeam);  // Create a new team
router.patch('/:id', updateTeam);  // Update a team by ID
router.delete('/:id', deleteTeam);  // Delete a team by ID

module.exports = router;
