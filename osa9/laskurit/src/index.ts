import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  res.json({ weight, height, bmi: calculateBmi(height, weight) });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises?: unknown;
    target?: unknown;
  };

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.length === 0 ||
    daily_exercises.some(day => isNaN(Number(day))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  res.json(calculateExercises(daily_exercises.map(Number), Number(target)));
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
