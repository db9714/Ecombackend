const UserModel = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const e = require('express');
const mongoose = require("mongoose")
require('dotenv').config();

exports.Login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ mobileNumber: req.body.mobileNumber });
        if (!user) {
            return next(createError(404, "User Not Found!"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, "Invalid user or password!"));
        }

        const token = jwt.sign({ id: user._id, isUser: user.isUser, isAdmin: user.isAdmin, isEmployee: user.isEmployee, isRetailer: user.isRetailer }, process.env.JWT);

        let userType = undefined;
        if (user.isAdmin) {
            userType = "admin";
        } else if (user.isUser) {
            userType = "user";
        } else if (user.isRetailer) {
            userType = "retailer";
        } else if (user.isEmployee) {
            userType = "employee";
        }

        // const {password,isAdmin,isEmployee,isRetailer,isEmailVerified,isActive
        //     ,updatedAt,createdAt,__v,...otherDetails} = user._doc; 
        res
            .cookie('access-token', token, { httpOnly: true })
            .status(200).json({
                status: true,
                message: 'Loged in successfully!',
                data: [{ "token": token, user:user }]
            });
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.message
        });
    }
}

exports.VerifyForRegister = async (req, res, next) => {
    try {
        const { mobileNumber, password, confirmPassword } = req.body;
        if (mobileNumber === undefined || mobileNumber === '') {
            return next(createError(403, "Mobile Number is required!"));
        }
        if (password === undefined || password === '') {
            return next(createError(403, "Password is required!"));
        }
        if (confirmPassword === undefined || confirmPassword === '') {
            return next(createError(403, "confirm password is required!"));
        }
        if ((await UserModel.findOne({ mobileNumber: mobileNumber }))) {
            return next(createError(403, "Given mobile number is already register!"));
        }
        if (password != confirmPassword) {
            return next(createError(403, "Password and confirmPassword does not match!"));
        }

        const generateOTP = Math.floor(100000 + Math.random() * 900000);
        //send this otp on mobile number

        res.status(200).json({
            status: true,
            message: 'Account Verified successfully!',
            data: [{ OTP: generateOTP }]
        });

    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.message
        });
    }
}

exports.Register = async (req, res, next) => {
    try {
        const { mobileNumber, password, confirmPassword } = req.body;
        if (mobileNumber === undefined || mobileNumber === '') {
            return next(createError(403, "Mobile Number is required!"));
        }
        if (password === undefined || password === '') {
            return next(createError(403, "Password is required!"));
        }
        if (confirmPassword === undefined || confirmPassword === '') {
            return next(createError(403, "confirm password is required!"));
        }
        if ((await UserModel.findOne({ mobileNumber: mobileNumber }))) {
            return next(createError(403, "Given mobile number is already register!"));
        }
        if (password != confirmPassword) {
            return next(createError(403, "Password and confirmPassword does not match!"));
        }

        const gensalt = bcrypt.genSaltSync(10);
        const hashPwd = bcrypt.hashSync(password, gensalt);
        req.body.password = hashPwd;
        if (req.body.isAdmin) {
            req.body.isAdmin = true;
            req.body.isUser = false;
        } else {
            req.body.isAdmin = false;
            req.body.isUser = true;
        }
        const newUser = await UserModel.create({ ...req.body });

        if (newUser === null) {
            res.status(400).json({
                status: false,
                message: 'Failed to create new account!'
            });
        } else {
            res.status(200).json({
                status: true,
                message: 'Account Created successfully!',
                userID:newUser._id,
                OTP: 12345
            });
        }
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.message
        });
    }
}

exports.ForgotPassword = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ mobileNumber: req.body.mobileNumber });
        if (!user) {
            return next(createError(404, 'User not found!'));
        }
        const generateOTP = Math.floor(100000 + Math.random() * 900000);
        //send OTP on email and SMS
        return res.status(200).json({
            status: true,
            message: 'User data matched! We have sent an OTP on your verified e-mail ID and mobile number!',
            data: [{ id: user._id, OTP: 12345 }]
        });
    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.message
        });
    }
}

exports.ResetPassword = async (req, res, next) => {
    try {
        const user = await UserModel.find({ mobileNumber: req.body.mobileNumber });
        console.log(user)
        if (!user) return next(createError(404, 'User not found!'));
        if (req.body.OTP !== 12345) {
            return next(createError(404, 'Incorrect OTP'));
        }
        if (req.body.password !== req.body.confirmPassword) return next(createError(403, 'New passowrd and confirm Password mismatch!'));

        const gensalt = bcrypt.genSaltSync(10);
        const hashPwd = bcrypt.hashSync(req.body.password, gensalt);

        const isPasswordUpdate = await UserModel.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body.userID) },
            { $set: { password: hashPwd } }
        )
        if (isPasswordUpdate) {
            return res.status(200).json({
                status: true,
                message: 'Your password reset successfully!'
            });
        } else {
            return next(createError(400, 'Failed to reset new password!'));
        }

    } catch (Err) {
        res.status(500).json({
            status: false,
            error: Err.message
        });
    }
}