type Rating = 1 | 2 | 3;
type RatingMetric = Record<Rating, string>;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number
): Result => {
  const n = dailyExerciseHours.length;
  const totalHours = dailyExerciseHours.reduce(
    (total, hours) => total + hours,
    0
  );
  const average = n === 0 ? 0 : totalHours / n;

  const ratingMetric: RatingMetric = {
    1: "try harder next time",
    2: "not too bad but could be better",
    3: "excellent job",
  };

  let rating: Rating = 1;
  if (average >= targetAmount) {
    rating = 3;
  } else if (average >= targetAmount * 0.85) {
    rating = 2;
  }

  return {
    periodLength: n,
    trainingDays: dailyExerciseHours.filter((e) => e > 0).length,
    success: average >= targetAmount,
    rating,
    ratingDescription: ratingMetric[rating],
    target: targetAmount,
    average,
  };
};
