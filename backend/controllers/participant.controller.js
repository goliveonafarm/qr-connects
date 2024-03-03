import Response from "../models/response.model.js";
import UserEvent from "../models/userEvent.model.js";

export const getParticipantResponses = async (req, res) => {
    try {
        const { participantId } = req.cookies;
        const participantResponses = await Response.find({ participantId });
        console.log(participantResponses)
        res.status(200).json({ participantResponses });
    } catch (error) {
        console.log("Error in response controller (getParticipantResponses)", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createParticipantResponse = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { responseData } = req.body;
        const { participantId } = req.cookies;

        const userEvent = await UserEvent.findById(eventId); // used for validation

        if (!userEvent) {
            return res.status(400).json({ message: "Invalid event" });
        }

        if (userEvent.formData.length !== responseData.length) {
            return res.status(400).json({ message: "Invalid response data" });
        }

        const repsonseCount = await Response.countDocuments({ participantId })

        if (repsonseCount >= 100) {
            return res.status(400).json({ message: "Maximum number of responses reached" });
        }

        const newResponse = await Response.create({
            eventId,
            participantId,
            responseData
        });

        res.status(201).json({ newResponse });
    } catch (error) {
        console.log("Error in response controller (createParticipantResponse)", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateParticipantResponse = async (req, res) => {
    try {
        const { responseId } = req.params;
        const { responseData } = req.body;
        const { participantId } = req.cookies;

        const updatedResponse = await Response.findByIdAndUpdate(
            { _id: responseId, participantId: participantId},
            { $set: { responseData: responseData } },
            { new: true }
        );

        if (!updatedResponse) {
            return res.status(400).json({ message: "Invalid response" });
        }

        res.json({message:"Response updated", data: updatedResponse})
    } catch (error) {
        console.log("Error in response controller (updateParticipantResponse)", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}