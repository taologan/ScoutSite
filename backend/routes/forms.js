 const express = require('express');
const {
    createForm,
    getForm
} = require("../controllers/formController");

const router = express.Router();

router.post('/', createForm);
// router.get('/:event_id', getForm);
 router.get('/', getForm);
module.exports = router;
