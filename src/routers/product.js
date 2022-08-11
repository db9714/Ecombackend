const express = require('express');

//Model
const ProductModel = require('../models/product.js');

//controllers
const productController = require('../controllers/product.js');

//middlewares
const Verify = require('../utilities/middlewares/auth.js');
const imgUpload = require('../config/ImageUploadConfig.js');

const productRouters = express.Router();

productRouters.get('/',productController.GetAllProducts);

productRouters.get('/:id',productController.GetProductByID);

productRouters.delete('/:id', productController.DeleteProduct);

productRouters.get('/search/:keyword',productController.GetProductByKeyword);

//retailer
productRouters.post('/',imgUpload.array('photo'),productController.AddProduct);

productRouters.get('/by-retailer-id/:id',Verify.verifyRetailer,productController.GetProductByretailerID);

productRouters.put('/',imgUpload.array('photo'), productController.UpdateProduct);

module.exports = productRouters;