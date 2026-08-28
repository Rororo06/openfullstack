export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  if (dailyHours.length === 0) {
    throw new Error('at least one day of exercise data is required');
  }
  if (target <= 0) {
    throw new Error('target must be a positive number');
  }

  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength;

  const { rating, ratingDescription } =
    average >= target
      ? { rating: 3, ratingDescription: 'well done, target reached' }
      : average >= target / 2
        ? { rating: 2, ratingDescription: 'not too bad but could be better' }
        : { rating: 1, ratingDescription: 'you should push harder next week' };

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface ExerciseArguments {
  target: number;
  dailyHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [target, ...dailyHours] = args.slice(2).map(Number);

  if ([target, ...dailyHours].some(isNaN)) {
    throw new Error('Provided values were not numbers!');
  }

  return { target, dailyHours };
};

if (require.main === module) {
  try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'unknown error';
    console.log('Error:', message);
  }
}
