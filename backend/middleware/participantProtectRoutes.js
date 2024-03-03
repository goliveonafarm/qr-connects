import generateUID from "../utils/generateUID.js";

const participantProtectRoutes = async (req, res, next) =>{
    console.log('this ran - participantRoutes')
    try {
        let participantId = req.cookies.participantId;
        if (!participantId){
            participantId = generateUID();
            const cookieOptions = {
                httpOnly: true,
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            };
            res.cookie("participantId", participantId, cookieOptions);
        }

        req.participantId = participantId;

        next();
    } catch (error) {
        console.log("Error in participantRoute middleware", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

export default participantProtectRoutes;