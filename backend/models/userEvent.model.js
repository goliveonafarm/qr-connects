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
        enum: ['potluck', 'poll', 'afterparty', 'survey']
    },
    shareResults: {
        type: Boolean,
        default: true
    },
    privateResults: {
        type: Boolean,
        default: false
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
        type: [String],
    }
    //createdAt, updatedAt
}, { timestamps: true });

const UserEvent = mongoose.model('UserEvent', userEventSchema);

export default UserEvent;