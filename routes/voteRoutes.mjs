import express from 'express';
import { voteQuestion, voteAnswer } from '../controllers/voteController.mjs';

const router = express.Router();

router.post('/questions/:questionId/vote', voteQuestion);
router.post('/answers/:answerId/vote', voteAnswer);

export default router;
