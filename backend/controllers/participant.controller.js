import Response from "../models/response.model.js";
import UserEvent from "../models/userEvent.model.js";
import mongoose from "mongoose";

export const createParticipantResponse = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { responseData } = [];
        const { participantId } = req.cookies;

        const userEvent = await UserEvent.findById(eventId); // used for validation

        if (!userEvent) {
            return res.status(400).json({ message: "Invalid event" });
        }

        const participantResponse = await Response.findOne({ eventId, participantId });
        if (participantResponse) {
            return res.status(400).json({ message: "Response already exists" });
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
        console.log("Error in participant controller (createParticipantResponse)", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateParticipantResponse = async (req, res) => {
    try {
        const { responseId } = req.params;
        const { responseData } = req.body;
        const { participantId } = req.cookies;

        const updatedResponse = await Response.findByIdAndUpdate(
            { _id: responseId, participantId: participantId },
            { $set: { responseData: responseData } },
            { new: true }
        );

        if (!updatedResponse) {
            return res.status(400).json({ message: "Invalid response" });
        }

        res.json({ message: "Response updated", data: updatedResponse })
    } catch (error) {
        console.log("Error in participant controller (updateParticipantResponse)", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getEventResponses = async (req, res) => {
    try {
        const { responseId } = req.params;

        const response = await Response.findById(responseId);
        if(!response) {
            return res.status(400).json({ message: "Invalid response" });
        }

        const eventId = response.eventId;

        // First, fetch the basic event details to check if shareResults is enabled
        const event = await UserEvent.findById(eventId, 'shareResults showNames');
        if (!event || !event.shareResults) {
            return res.status(200).json({ responses: [] });
        }

        const pipeline = [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(eventId)
                }
            },
            {
                $lookup: {
                    from: "responses",
                    localField: "_id",
                    foreignField: "eventId",
                    as: "responses"
                }
            },
            {
                $unwind: {
                    path: "$responses",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $replaceRoot: { newRoot: "$responses" }
            },
            {
                $project: {
                    responseData: {
                        attending: 1,
                        vote: 1,
                        dish: 1,
                        name: {
                            $cond: {
                                if: event.showNames, // Use the showNames value fetched earlier
                                then: "$responseData.name",
                                else: "$$REMOVE"
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    responses: { $push: "$responseData" }
                }
            },
            {
                $project: {
                    _id: 0,
                    responses: 1
                }
            }
        ];

        const result = await UserEvent.aggregate(pipeline);
        const responses = result[0] ? result[0].responses : [];
        res.status(200).json({ responses });
    }
    catch (error) {
        console.log("Error in participant controller (getEventResponses)", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getParticipantResponsesWithEvents = async (req, res) => {
    try {
        const participantId = req.cookies.participantId;
        const participantResponsesWithEvents = await UserEvent.aggregate([
            {
                $lookup: {
                    from: "responses",
                    localField: "_id",
                    foreignField: "eventId",
                    as: "responses"
                }
            },
            {
                $unwind: {
                    path: "$responses",
                    preserveNullAndEmptyArrays: true // Preserve events without responses
                }
            },
            {
                $match: {
                    // This match stage is to filter responses; adjust or remove according to your needs
                    "responses.participantId": participantId
                }
            },
            {
                $addFields: {
                    eventId: {
                        $cond: { if: "$shareable", then: "$_id", else: null }
                    }
                }
            },
            {
                $project: {
                    _id: "$responses._id", // Set the document's _id to be the response's _id
                    eventId: "$eventId",
                    formData: 1,
                    formType: 1,
                    active: 1,
                    responseData: "$responses.responseData",
                    // Any other event or response fields you need
                }
            }
        ]);

        res.status(200).json({ participantResponsesWithEvents });
    } catch (error) {
        console.log("Error in participant controller (getParticipantEvents)", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteParticipantResponse = async (req, res) => {
    try {

        const { responseId } = req.params;
        const { participantId } = req.cookies;

        const participantResponse = await Response.findById(responseId);
        if (!participantResponse || participantResponse.participantId.toString() !== participantId.toString()) {
            return res.status(400).json({ message: "Invalid response" });
        }
        await Response.deleteOne({ _id: responseId });

        res.status(200).json({ message: "Response deleted successfully" });
    } catch (error) {
        console.log('Error in participant controller (deleteParticipantResponse)', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}