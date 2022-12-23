const Event = require('../../models/event')
const ObjectId = require('mongodb').ObjectId

async function create(req,res,next){
    try {
        // const event = new Event(req.body)
        // console.log(req.body)
        const event = new Event()
        console.log(req.body)
        event.title = req.body.title
        event.start = req.body.start
        event.end = req.body.end
        event.color = req.body.backgroundColor
        await event.save()
        res.json(event)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function index(req,res,next){
    try{
        const events = await Event.find().sort({"start":1});
        res.send(events)
    }catch(err) {
        res.status(400).json(err)
    }
}

async function deleteOne(req,res,next){
    try{
        
        await Event.deleteOne({_id:ObjectId(req.params.id)})
        res.json()
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports = {
    create,
    index,
    delete:deleteOne
}