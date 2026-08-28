export type BmiCategory =
  | 'Underweight (unhealthy weight)'
  | 'Normal range (healthy weight)'
  | 'Overweight (unhealthy weight)'
  | 'Obese (unhealthy weight)';

export const calculateBmi = (height: number, weight: number): BmiCategory => {
  if (height <= 0 || weight <= 0) {
    throw new Error('height and weight must be positive numbers');
  }

  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return 'Underweight (unhealthy weight)';
  }
  if (bmi < 25) {
    return 'Normal range (healthy weight)';
  }
  if (bmi < 30) {
    return 'Overweight (unhealthy weight)';
  }
  return 'Obese (unhealthy weight)';
};

interface BmiArguments {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const [height, weight] = args.slice(2).map(Number);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  return { height, weight };
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'unknown error';
    console.log('Error:', message);
  }
}
