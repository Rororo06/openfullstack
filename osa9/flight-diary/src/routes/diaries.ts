import express from 'express';

import * as diaryService from '../services/diaryService';
import { toNewDiaryEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    res.json(diaryService.addDiary(newDiaryEntry));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong.';
    res.status(400).send(message);
  }
});

export default router;
