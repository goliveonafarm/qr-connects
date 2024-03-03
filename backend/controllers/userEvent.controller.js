import UserEvent from "../models/userEvent.model.js";

export const createUserEvent = async (req, res) => {
    try {
        const { formType, formData } = req.body;
        const userId = req.userId._id;

        const userEventCount = await UserEvent.countDocuments({ userId });

        if (userEventCount >= 5) {
            return res.status(400).json({ message: "Maximum number of events reached" });
        }

        const newUserEvent = await UserEvent.create({
            userId,
            formType,
            formData,
            active: true
        });

        res.status(201).json({ newUserEvent });
    } catch (error) {
        console.log("Error in userEvent controller", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserEvents = async (req, res) => {
    try {
        const userId = req.userId._id;
        const userEvents = await UserEvent.find({ userId });

        res.status(200).json({ userEvents });
    } catch (error) {
        console.log("Error in userEvent controller", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteUserEvent = async (req, res) => {
    try {

        const { eventId } = req.params;
        const userId = req.userId._id;

        const userEvent = await UserEvent.findById(eventId);

        if (!userEvent || userEvent.userId.toString() !== userId.toString()) {
            return res.status(400).json({ message: "Invalid event" });
        }

        await UserEvent.deleteOne({ _id: eventId });
        
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.log("Error in userEvent controller", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}