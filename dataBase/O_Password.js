const { Schema, model } = require('mongoose');

const oPasswordSchema = new Schema({
    password_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

}, { timestamps: true });

module.exports = model('o_password', oPasswordSchema);
