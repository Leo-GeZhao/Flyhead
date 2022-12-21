
const express = require('express');
const router = express.Router();

const eventCtrl = require('../../controllers/api/events')

router.post('/create-event', eventCtrl.create);
router.get('/events', eventCtrl.index );

module.exports = router;