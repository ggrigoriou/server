const mongoose = require('mongoose');
const { Schema } = mongoose;

const NavigationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    route: {
        type: String,
        required: true,
        index: true
    },
    enteredAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    leftAt: Date,
    durationMs: Number
});

module.exports = mongoose.model(
    'Navigation', 
    NavigationSchema
);
