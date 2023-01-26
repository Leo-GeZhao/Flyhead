const Event = require("../../models/event");

//Create Event
async function create(req, res, next) {
  try {
    const event = await Event.createEvent(req);
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json(err);
  }
}

//Get All Events
async function index(req, res, next) {
  try {
    const events = await Event.getAllEvents(req);
    res.status(200).send(events);
  } catch (err) {
    res.status(400).json(err);
  }
}

//Delete Event
async function deleteOne(req, res, next) {
  try {
    await Event.deleteEvent(req);
    res.status(200).json();
  } catch (err) {
    res.status(400).json(err);
  }
}

//Toggle Unfinished Event to Finished Event
async function finish(req, res, next) {
  try {
    await Event.setFinish(req);
    res.status(200).json();
  } catch (err) {
    res.status(400).json(err);
  }
}

//Edit Expense for Finished Event
async function edit(req, res, next) {
  try {
    await Event.editExpense(req);
    res.status(200).json();
  } catch (err) {
    res.status(400).json(err);
  }
}

//Get All Finished Event
async function finishEvent(req, res, next) {
  try {
    const finishedEvent = await Event.getFinishedEvent(req);
    res.status(200).json(finishedEvent);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  create,
  index,
  delete: deleteOne,
  finish,
  edit,
  finishEvent,
};
