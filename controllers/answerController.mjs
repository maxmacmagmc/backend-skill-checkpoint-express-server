// ✅ controllers/questionController.mjs
import db from '../utils/db.mjs';


// ✅ Create answer
export const createAnswer = async (req, res) => {
  const { questionId } = req.params;
  const { content } = req.body;
  if (!content || content.length > 300) {
    return res.status(400).json({ message: 'Invalid request data.' });
  }
  try {
    const question = await db.query('SELECT id FROM questions WHERE id = $1', [questionId]);
    if (question.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    await db.query('INSERT INTO answers (question_id, content) VALUES ($1, $2)', [questionId, content]);
    res.status(201).json({ message: 'Answer created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to create answers.' });
  }
};

// ✅ Get answers
export const getAnswersByQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await db.query('SELECT id FROM questions WHERE id = $1', [questionId]);
    if (question.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    const result = await db.query('SELECT id, content FROM answers WHERE question_id = $1', [questionId]);
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch answers.' });
  }
};

// ✅ Delete answers
export const deleteAnswersByQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await db.query('SELECT id FROM questions WHERE id = $1', [questionId]);
    if (question.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    await db.query('DELETE FROM answers WHERE question_id = $1', [questionId]);
    res.status(200).json({ message: 'All answers for the question have been deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to delete answers.' });
  }
};
