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
    formData: {
        type: [String],
    },
    active: {
        type: Boolean,
        default: true
    }
    //createdAt, updatedAt
}, { timestamps: true });

const UserEvent = mongoose.model('UserEvent', userEventSchema);

export default UserEvent;