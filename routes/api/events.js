
const express = require('express');
const router = express.Router();

const eventCtrl = require('../../controllers/api/events')

router.post('/create-event', eventCtrl.create);
router.get('/events', eventCtrl.index );
router.delete('/delete-event/:id',eventCtrl.delete);

module.exports = router;