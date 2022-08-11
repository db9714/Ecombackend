const express = require('express');
const OrderController = require('../controllers/order.js');

const orderRouters = express.Router();

orderRouters.get('/:id',OrderController.GetAllOrdersByUserID);


module.exports = orderRouters;

// "http://localhost:3000/api/order/:id"