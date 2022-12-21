const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    category:{
        type:String,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Event', eventSchema);