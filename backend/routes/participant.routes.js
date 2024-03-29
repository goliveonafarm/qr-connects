import express from 'express';
import { getParticipantResponses, createParticipantResponse, updateParticipantResponse, deleteParticipantResponse, getParticipantResponsesWithEvents, getEventResponses } from '../controllers/participant.controller.js';
import participantProtectRoutes from '../middleware/participantProtectRoutes.js';

const router = express.Router();

router.post('/create/:eventId', participantProtectRoutes, createParticipantResponse)
router.get('/get/:eventId', participantProtectRoutes, getEventResponses)
router.put('/update/:responseId', participantProtectRoutes, updateParticipantResponse)
router.delete('/delete/:responseId', participantProtectRoutes, deleteParticipantResponse)
router.get('/', participantProtectRoutes, getParticipantResponses)
router.get('/get', participantProtectRoutes, getParticipantResponsesWithEvents)

export default router;