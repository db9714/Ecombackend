//Model
const createError = require('http-errors');
const ProductModel = require('../models/product.js');

exports.GetAllProducts = async (req, res, next) => {
    try {
        const AllProduct = await ProductModel.find({}, { __v: 0 });
        res.status(200).json({
            status: true,
            count: AllProduct.length,
            result: AllProduct,
        });
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}


exports.GetProductByID = async (req, res, next) => {
    try {
        const Product = await ProductModel.find({ _id: req.params.id }, { __v: 0 });
        if (Product == null) {
            res.status(404).json({
                status: false,
                message: 'Product not found!'
            });
        } else {
            res.status(200).json({
                status: true,
                result: Product
            });
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}


exports.AddProduct = async (req, res, next) => {
    try {
        count = 0;
        req.body.images = [];
        req.body.MRP = parseFloat(req.body.MRP);
        req.body.discount = parseFloat(req.body.discount);
        req.body.stock = parseFloat(req.body.stock);
        req.body.tax = parseFloat(req.body.tax);
        req.files.map((imgObj) => {
            req.body.images.push(imgObj.location);
        })
        const newProduct = await ProductModel.create(req.body);
        if (newProduct == null) {
            res.status(404).json({
                status: false,
                message: 'Failed to Add new product!'
            });
        } else {
            res.status(200).json({
                status: true,
                message: 'New product added successfully!',
                result: newProduct
            });
        }
    } catch (Err) {
        console.log(Err);
        return next(createError(500, Err.message));
    }
}


exports.UpdateProduct = async (req, res, next) => {
    try {
        count = 0;
        req.body.images = [];
        req.body.MRP = parseFloat(req.body.MRP);
        req.body.discount = parseFloat(req.body.discount);
        req.body.stock = parseFloat(req.body.stock);
        req.body.tax = parseFloat(req.body.tax);
        req.files.map((imgObj) => {
            req.body.images.push(imgObj.location);
        })
        const UpdatedProduct = await ProductModel.findByIdAndUpdate(req.body.productID, req.body, { new: true });
        if (UpdatedProduct == null) {
            res.status(404).json({
                status: false,
                message: 'Product not found!'
            });
        } else {
            res.status(200).json({
                status: true,
                message: 'Product updated successfully!',
                data: UpdatedProduct
            });
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}


exports.DeleteProduct = async (req, res, next) => {
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
        if (deleteProduct == null) {
            res.status(404).json({
                status: false,
                message: 'Product not found!'
            });
        } else {
            res.status(200).json({
                status: true,
                message: 'Product deleted successfully!'
            });
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err
        });
    }
}


exports.GetProductByKeyword = async (req, res, next) => {
    try {
        const Product = await ProductModel.find({
            $or: [
                { 'tags': { $in: ['/' + req.params.keyword + '/i'] } },
                { 'category': { '$regex': req.params.keyword, '$options': 'i' } },
                { 'SubCategory': { '$regex': req.params.keyword, '$options': 'i' } },
                { 'description': { '$regex': req.params.keyword, '$options': 'i' } },
                { 'brandName': { '$regex': req.params.keyword, '$options': 'i' } },
                { 'title': { '$regex': req.params.keyword, '$options': 'i' } },
            ],
            $and: [
                { 'approved': false }
            ]
        }, { __v: 0 });
        if (Product == null) {
            res.status(404).json({
                status: false,
                message: 'Product not found!'
            });
        } else {
            res.status(200).json({
                status: true,
                count: Product.length,
                result: Product
            });
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}


exports.GetProductByretailerID = async (req, res, next) => {
    try {
        const Product = await ProductModel.find({ retailerID: req.params.id }, { __v: 0 });
        if (Product == null) {
            res.status(404).json({
                status: false,
                message: 'Product not found!'
            });
        } else {
            res.status(200).json({
                status: true,
                count: Product.length,
                result: Product
            });
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.errmsg
        });
    }
}

