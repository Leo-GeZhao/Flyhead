const Event = require("../../models/event");
const ObjectId = require("mongodb").ObjectId;

async function create(req, res, next) {
  try {
    const event = new Event();
    event.title = req.body.title;
    event.start = req.body.start;
    event.end = req.body.end;
    event.color = req.body.backgroundColor;
    if (req.body.user) {
      event.user = req.body.user;
    } else {
      event.user = req.body.extendedProps.user;
    }
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res, next) {
  try {
    const events = await Event.find({ user: req.body.user }).sort({
      start: 1,
    });
    res.send(events);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteOne(req, res, next) {
  try {
    await Event.deleteOne({ _id: ObjectId(req.params.id) });
    res.json();
  } catch (err) {
    res.status(400).json(err);
  }
}

async function finish(req, res, next) {
  try {
    await Event.updateOne({ _id: req.params.id }, { $set: { isFinish: true } });
    res.json();
  } catch (err) {
    res.status(400).json(err);
  }
}

async function edit(req, res, next) {
  try {
    await Event.findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { expense: req.body.expenseNum }
    );
    res.json();
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
};
