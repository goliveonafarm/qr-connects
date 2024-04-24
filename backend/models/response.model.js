import mongoose from "mongoose";

const reponseSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserEvent',
        required: true
    },
    participantId: {
        type: String,
        maxlength: 40,
        required: true
    },
    responseData: {
        attending: Boolean,
        name: { type: String, maxlength: 100 },
        vote: { type: Number, min: 0, max: 5 },
        dish: { type: String, maxlength: 100 },
    }
}, { timestamps: true });

const Response = mongoose.model('Response', reponseSchema);

export default Response;