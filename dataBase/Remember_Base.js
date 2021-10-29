const { Schema, model } = require('mongoose');

const userRemember = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    lastIn: {
        type: Date
    }
}, { timestamps: true });

module.exports = model('remember', userRemember);
