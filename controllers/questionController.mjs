import db from '../utils/db.mjs';
import express from 'express';


// ✅ Required: Create question
export const createQuestion = async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Invalid request data.' });
  }
  try {
    await db.query(
      'INSERT INTO questions (title, description, category) VALUES ($1, $2, $3)',
      [title, description, category]
    );
    res.status(201).json({ message: 'Question created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to create question.' });
  }
};

// ✅ Required: Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM questions');
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch questions.' });
  }
};

// ✅ Required: Get question by ID
export const getQuestionById = async (req, res) => {
  const { questionId } = req.params;
  try {
    const result = await db.query('SELECT * FROM questions WHERE id = $1', [questionId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    res.status(200).json({ data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch questions.' });
  }
};

// ✅ Required: Update question by ID
export const updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Invalid request data.' });
  }
  try {
    const result = await db.query(
      'UPDATE questions SET title = $1, description = $2, category = $3 WHERE id = $4',
      [title, description, category, questionId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    res.status(200).json({ message: 'Question updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch questions.' });
  }
};

// ✅ Required: Delete question by ID
export const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    await db.query('DELETE FROM answers WHERE question_id = $1', [questionId]);
    const result = await db.query('DELETE FROM questions WHERE id = $1', [questionId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Question not found.' });
    }
    res.status(200).json({ message: 'Question post has been deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to delete question.' });
  }
};

// ✅ Optional: Search questions by title or category
export const searchQuestions = async (req, res) => {
  const { title, category } = req.query;
  if (!title && !category) {
    return res.status(400).json({ message: 'Invalid search parameters.' });
  }
  try {
    const result = await db.query(
      'SELECT * FROM questions WHERE title ILIKE $1 OR category ILIKE $2',
      [`%${title || ''}%`, `%${category || ''}%`]
    );
    res.status(200).json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Unable to fetch a question.' });
  }
};
