import mongoose from "mongoose";

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
        time: { type: Date },
        date: { type: Date }
    }
}, { timestamps: true });

const UserEvent = mongoose.model('UserEvent', userEventSchema);

export default UserEvent;

function arrayLimit(val) {
    return val.length <= 10;
}