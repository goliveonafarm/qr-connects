import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
    hour: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    minute: {
        type: Number,
        required: true,
        min: 0,
        max: 59,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    period: {
        type: String,
        required: true,
        enum: ['AM', 'PM']
    }
}, { _id: false });

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 100
    }
}, { _id: false });

const userEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    formType: {
        type: String,
        required: true,
        enum: ['potluck', 'poll', 'afterparty'],
        maxlength: 11
    },
    shareResults: {
        type: Boolean,
        default: true
    },
    showNames: {
        type: Boolean,
        default: true
    },
    shareable: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    },
    formData: {
        location: { type: String, maxlength: 100 },
        name: { type: String, maxlength: 100 },
        time: timeSchema,
        date: { type: Date },
        options:{
            type: [optionSchema],
            validate: {
                validator: arrayLimit,
                message: 'You can only have up to 5 options'
            }
        }
    }
}, { timestamps: true });

const UserEvent = mongoose.model('UserEvent', userEventSchema);

export default UserEvent;

function arrayLimit(val) {
    return val.length <= 5;
}