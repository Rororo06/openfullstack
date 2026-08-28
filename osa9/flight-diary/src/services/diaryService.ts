import diaryData from '../../data/entries';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData;

export const getEntries = (): DiaryEntry[] => diaries;

export const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] =>
  diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));

export const findById = (id: number): DiaryEntry | undefined =>
  diaries.find(diary => diary.id === id);

export const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(0, ...diaries.map(d => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};
