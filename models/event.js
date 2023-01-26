const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    color: {
      type: String,
    },
    isFinish: {
      type: Boolean,
      default: false,
    },
    expense: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Create Event
eventSchema.statics.createEvent = async function (req) {
  const { title, start, end } = req.body;
  const event = await this.create({
    title: title,
    start: start,
    end: end,
    color: req.body.backgroundColor,
    user: req.body.user ? req.body.user : req.body.extendedProps.user,
  });
  return event;
};

//Get All Events
eventSchema.statics.getAllEvents = async function (req) {
  const user = req.body;
  const events = await this.find(user).sort({ start: 1 });
  return events;
};

//Delete Event
eventSchema.statics.deleteEvent = async function (req) {
  await this.deleteOne({ _id: req.params.id });
  return "Event Deleted";
};

//Toggle Unfinished Event to Finished Event
eventSchema.statics.setFinish = async function (req) {
  await this.updateOne({ _id: req.params.id }, { $set: { isFinish: true } });
  return "Event Upated";
};

//Edit Expense for Finished Event
eventSchema.statics.editExpense = async function (req) {
  await this.findOneAndUpdate(
    { _id: req.params.id },
    { expense: req.body.expenseNum }
  );
  return "Expense Upated";
};

//Get All Finished Event
eventSchema.statics.getFinishedEvent = async function (req) {
  const events = await this.find({ user: req.body.user, isFinish: true });
  return events;
};

module.exports = mongoose.model("Event", eventSchema);
