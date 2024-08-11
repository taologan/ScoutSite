const express = require('express');
const {
    createFormField,
    getFormFields,
    getFormFieldById,
    updateFormField,
    deleteFormField
} = require("../controllers/formFieldsController");

const router = express.Router();

router.get('/', getFormFields);  
router.get('/:id', getFormFieldById);
router.post('/', createFormField); 
router.patch('/:id', updateFormField); 
router.delete('/:id', deleteFormField);

module.exports = router;
