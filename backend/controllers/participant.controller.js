import Response from "../models/response.model.js";
import UserEvent from "../models/userEvent.model.js";
import mongoose from "mongoose";

export const getParticipantResponses = async (req, res) => {
    try {
        const { participantId } = req.cookies;

        const participantResponses = await Response.find({ participantId });
        res.status(200).json({ participantResponses });
    } catch (error) {
        console.log("Error in participant controller (getParticipantResponses)", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

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



//to do next:
//create a new function to get an event's responses.
//it will only get an event's responses if the event's shareResults is true.
//also need to check if showNames is true, if so ignore the participant's name in the response.
//it's also unique to the participantId, so we'll need to pull that from req.cookies.
export const getEventResponses = async (req, res) => {
    console.log('entered')
    try {
        const { eventId } = req.params;
        //aggregate to check if event is shareable and returns the event's responses
        //also checks if event is showNames and returns the responses user names if true

        const pipeline = [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(eventId),
                    shareResults: true
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
                $addFields: {
                    "responses.responseData.name": {
                        $cond: {
                            if: "$showNames",
                            then: "$responses.responseData.name", // If showNames is true, keep the name
                            else: "$$REMOVE" // If showNames is false, remove the name
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    showNames: { $first: "$showNames" },
                    responses: { $push: "$responses" }
                }
            },
            {
                $project: {
                    _id: 1,
                    showNames: 1,
                    responses: 1
                }
            }
        ];

        const eventResponses = await UserEvent.aggregate(pipeline);
        console.log(eventResponses)
        res.status(200).json({ eventResponses });
    }
    catch (error) {
        console.log("Error in participant controller (getEventResponses)", error.message)
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
                    shareResults: 1,
                    showNames: 1,//rename to showNames
                    active: 1,
                    shareable: 1,
                    responseData: "$responses.responseData",
                    // Any other event or response fields you need
                }
            }
        ]);

        const testResponse = await Response.find();

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