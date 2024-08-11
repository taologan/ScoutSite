const express = require('express');
const {
    createForm,
    getForms,
    getFormById,
    updateForm,
    deleteForm
} = require("../controllers/formController");

const router = express.Router();

router.get('/', getForms);
router.get('/:id', getFormById);
router.post('/', createForm);
router.patch('/:id', updateForm);
router.delete('/:id', deleteForm);

module.exports = router;
