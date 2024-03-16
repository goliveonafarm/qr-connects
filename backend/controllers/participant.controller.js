import Response from "../models/response.model.js";
import UserEvent from "../models/userEvent.model.js";

export const getParticipantResponses = async (req, res) => {
    try {
        const { participantId } = req.cookies;

        const participantResponses = await Response.find({ participantId });
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
        console.log('eventId', eventId)

        const userEvent = await UserEvent.findById(eventId); // used for validation

        if (!userEvent) {
            return res.status(400).json({ message: "Invalid event" });
        }
        console.log(userEvent)


        if (userEvent.formData.length !== responseData.length) {
            //return res.status(400).json({ message: "Invalid response data" });
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
        console.log("Error in response controller (updateParticipantResponse)", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}


export const getParticipantResponsesWithEvents = async (req, res) => {
    try {
        const participantId = req.cookies.participantId;
        console.log(participantId)
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
                        $cond: { if: "$shareResults", then: "$_id", else: null }
                    }
                }
            },
            {
                $project: {
                    _id: "$responses._id", // Set the document's _id to be the response's _id
                    eventId: "$_id",
                    formData: 1,
                    formType: 1,
                    shareResults: 1,
                    privateResults: 1,
                    active: 1,
                    shareable: 1,
                    responseData: "$responses.responseData",
                    // Any other event or response fields you need
                }
            }
        ]);

        const testResponse = await Response.find();
        console.log('testResponse', testResponse)

        res.status(200).json({ participantResponsesWithEvents });
    } catch (error) {
        console.log("Error in response controller (getParticipantEvents)", error.message);
        res.status(500).json({ error: "Internal server error" });
    } finally {

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
        console.log('Error in response controller (deleteParticipantResponse)', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}