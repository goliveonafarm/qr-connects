import mongoose from "mongoose";

const reponseSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserEvent',
        required: true
    },
    participantId: {
        type: String,
        required: true
    },
    responseData: {
        type: {},
        required: false
    }
}, { timestamps: true });

const Response = mongoose.model('Response', reponseSchema);

export default Response;