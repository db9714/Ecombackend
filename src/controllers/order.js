const createError = require('http-errors');
const OrderModel = require('../models/order');

exports.GetAllOrdersByUserID = async (req,res,next) => {
    try{
        const allOrders = await OrderModel.find({userID:req.params.id});
        if(allOrders.length === 0){
            return next(createError(404,"Not Orders found!"));
        }

        return res.status(200).json({
           status:true,
           message:'Order successfull found!',
           data:[allOrders]
        });
    }catch(Err){
        return next(createError(500,Err.message));
    }
}

exports.CreateOrderByUserID = async (req,res,next) =>{
    try{
        const newOrder = await OrderModel.create(req.body);

        if(newOrder === null){
            return next(createError(400,"Unable to place your order!"));
        }

        return res.status(200).json({
            status:true,
            message:'Order successfull Placed!',
         });

    }catch(Err){
        return next(createError(500,Err.message));
    }
}
