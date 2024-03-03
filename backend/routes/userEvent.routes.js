import express from 'express';
import { createUserEvent, getUserEvents, deleteUserEvent } from '../controllers/userEvent.controller.js';
import protectRoute from '../middleware/protectRoutes.js';

const router = express.Router();

router.get('/', protectRoute, getUserEvents)
router.post('/create', protectRoute, createUserEvent)
router.delete('/delete/:eventId', protectRoute, deleteUserEvent)

export default router;