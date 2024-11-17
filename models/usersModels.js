const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already taken'],
        trim : true,
        minLenght: [5, 'Email must be at least 5 characters'],
        lowercase: true
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        select:false,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    verificationCode:{
        type: String,
    },
    verificationCodeValidation:{
        type: Number,
        select: false,
    },
    forgotPasswordCode:{
        type: String,
        select: false,
    },
    forgotPasswordCodeValidation:{
        type: Number,
        select: false,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);