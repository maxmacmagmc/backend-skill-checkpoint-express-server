import express from 'express';
import {
    createAnswer,
    getAnswersByQuestion,
    deleteAnswersByQuestion
} from '../controllers/answerController.mjs';

const router = express.Router();

router.post('/:questionId/answers', createAnswer);
router.get('/:questionId/answers', getAnswersByQuestion);
router.delete('/:questionId/answers', deleteAnswersByQuestion);

export default router;
