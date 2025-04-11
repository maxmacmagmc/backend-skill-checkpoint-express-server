import { createQuestion, 
    getAllQuestions, 
    searchQuestions, 
    getQuestionById, 
    updateQuestion, 
    deleteQuestion 
} from '../controllers/questionController.mjs';
import express from 'express';


const router = express.Router();

router.post('/', createQuestion);
router.get('/', getAllQuestions);
router.get('/search', searchQuestions);
router.get('/:questionId', getQuestionById);
router.put('/:questionId', updateQuestion);
router.delete('/:questionId', deleteQuestion);

export default router;
