import express from 'express';
import { getResponses } from '../controllers/response.controller.js';

const router = express.Router();

router.get('/:eventId', getResponses)

export default router;
