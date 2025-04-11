import express from 'express';
import questionRoutes from './routes/questionRoutes.mjs';
import answerRoutes from './routes/answerRoutes.mjs';
import voteRoutes from './routes/voteRoutes.mjs';
import { errorHandler } from './middlewares/errorHandler.mjs';

const app = express();

app.use(express.json());

app.use('/questions', questionRoutes);
app.use('/questions', answerRoutes); // answer routes still use /questions/:id/answers
app.use('/', voteRoutes); // vote routes contain full path in router

app.use(errorHandler);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});