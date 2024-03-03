import Response from "../models/response.model.js";

export const getResponses = async (req, res) => {
    try {
        const { eventId } = req.params;
        const responses = await Response.find({ eventId });

        res.status(200).json({ responses });
    } catch (error) {
        console.log("Error in response controller", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

