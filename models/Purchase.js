const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    coinId:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

});

module.exports = mongoose.model('Purchase',purchaseSchema)