const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    coinId:{
        type:String,
        required:true,
    },
    value:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true
    }


});

module.exports = mongoose.model('Notification',notificationSchema)