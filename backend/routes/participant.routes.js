import express from 'express';
import { getParticipantResponses, createParticipantResponse, updateParticipantResponse } from '../controllers/participant.controller.js';
import participantProtectRoutes from '../middleware/participantProtectRoutes.js';

const router = express.Router();

router.post('/create/:eventId', participantProtectRoutes, createParticipantResponse)
router.put('/update/:responseId', participantProtectRoutes, updateParticipantResponse)
router.get('/', participantProtectRoutes, getParticipantResponses)

export default router;