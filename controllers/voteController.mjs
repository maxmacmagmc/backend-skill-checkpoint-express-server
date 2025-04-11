
import db from '../utils/db.mjs';


// ✅ Vote on a question
export const voteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { vote } = req.body;
  if (vote !== 1 && vote !== -1) {
    return res.status(400).json({ message: 'Invalid vote value.' });
  }
  try {
    const result = await db.query(
      'UPDATE question_votes SET vote = vote + $1 WHERE id = $2 RETURNING *',
      [vote, questionId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    res.status(200).json({ message: 'Vote on the question has been recorded successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to vote question.' });
  }
};

// ✅ Vote on an answer
export const voteAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { vote } = req.body;
  if (vote !== 1 && vote !== -1) {
    return res.status(400).json({ message: 'Invalid vote value.' });
  }
  try {
    const result = await db.query(
      'UPDATE answers_votes SET vote = vote + $1 WHERE answer_id = $2 RETURNING *',
      [vote, answerId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Answer not found.' });
    }
    res.status(200).json({ message: 'Vote on the answer has been recorded successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to vote answer.' });
  }
};
