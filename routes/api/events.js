const express = require("express");
const router = express.Router();

const eventCtrl = require("../../controllers/api/events");

//Create Event
router.post("/create-event", eventCtrl.create);

//Get All Events
router.post("/events", eventCtrl.index);

//Delte Event
router.delete("/delete-event/:id", eventCtrl.delete);

//Change unfinished event to finished event
router.put("/finish-event/:id", eventCtrl.finish);

//Edit finished Event Expense
router.put("/:id/edit-expense", eventCtrl.edit);

//Get All Finished Event
router.post("/finished-events", eventCtrl.finishEvent);

module.exports = router;
