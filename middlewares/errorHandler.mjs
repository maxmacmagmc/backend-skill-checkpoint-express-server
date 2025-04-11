function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
  
    if (err.code === '23505') {
      // Unique constraint violation (PostgreSQL specific error code)
      return res.status(409).json({ message: 'Conflict: Duplicate entry.' });
    }
  
    if (err.code === '22P02') {
      // Invalid text representation (e.g. invalid UUID)
      return res.status(400).json({ message: 'Invalid input syntax.' });
    }
  
    if (err.status && err.message) {
      return res.status(err.status).json({ message: err.message });
    }
  
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
  export { errorHandler };