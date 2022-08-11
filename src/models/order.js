const mongoose = require('../config/DBConfig');

const OrderSchema = mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'This filed is required!'],
    },
    retailerID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'This filed is required!'],
    },
    deliveryStatus:{
        type:String,
        required:[true,'This field is required!'],
        default:"YTD",
    },
    paymentStatus:{
        type:Boolean,
        required:[true,'This field is required!'],
        default:false
    },
    paymentMethod:{
        type:String,
        required:[true,'This field is required!']
    },
    transactionID:{
        type:String
    },
    productID:{
        type:mongoose.Schema.ObjectId,
        required:[true,'This field is required!']
    },
    quantity:{
        type:String,
        required:[true,'This field is required!']
    },
    amount:{
        type:Number,
        required:[true,'This field is required!']
    },
    remark:{
        type:String
    },
    deliveryAddress:{
        type:String,
        required:[true,'This field is required!']
    },
    retailerAddress:{
        type:String,
        required:[true,'This field is required!']
    }
},{
    timestamp:{
        createdAt:true,
        updatedAt:true
    }
});


const OrderModel = mongoose.model('Orders',OrderSchema);

module.exports = OrderModel;