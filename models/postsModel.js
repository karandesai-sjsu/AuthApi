const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description:{
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);