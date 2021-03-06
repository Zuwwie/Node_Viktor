const { Schema, model } = require('mongoose');

const userRoles = require('../configs/user-roles.enum');
const { passwordService } = require('../service');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    age: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
    },
    lastIn: {
        type: Date
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
userSchema.statics = {
    async createUserWithHashPassword( userObject ) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({ ...userObject, password: hashedPassword });
    }
};

module.exports = model('user', userSchema);
