const moment = require('moment')
const Event = require('../../models/event')


async function create(req,res,next){
    try {
        const event = new Event(req.body)
        await event.save()
        res.json({event})
    } catch(err) {
        res.status(400).json(err)
    }
}

async function index(req,res,next){
    try{
        const events = await Event.find();
        res.send(events)
    }catch(err) {
        res.status(400).json(err)
    }
}

module.exports = {
    create,
    index,
}