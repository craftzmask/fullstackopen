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

export const calculateExercises = (
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

if (typeof require !== "undefined" && require.main === module) {
  try {
    if (process.argv.length < 4) {
      throw Error(
        "Invalid arguments: npm run calculateExercises <target> <h1> [h2 ...]"
      );
    }

    const targetAmount = Number(process.argv[2]);
    const dailyExerciseHours = process.argv.slice(3).map((h) => {
      const hours = Number(h);
      if (!Number.isFinite(hours)) {
        throw Error(
          "Invalid arguments: Daily hour must be a finite positive number"
        );
      }

      if (hours < 0) {
        throw Error(
          "Invalid arguments: All daily hours must be finite numbers ≥ 0"
        );
      }

      return hours;
    });

    console.log(calculateExercises(dailyExerciseHours, targetAmount));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
