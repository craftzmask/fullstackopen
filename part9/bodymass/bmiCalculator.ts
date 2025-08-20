export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height / 100) * (height / 100));

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25.0) {
    return "Normal Range";
  } else if (bmi < 30.0) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

export const parseBmiArguments = (
  heightArg: string,
  weightArg: string
): { height: number; weight: number } => {
  const height = Number(heightArg);
  const weight = Number(weightArg);

  if (!Number.isFinite(height) || !Number.isFinite(weight)) {
    throw new Error("Invalid arguments: Height or weight must be a number");
  }

  if (!(height > 0 && weight > 0)) {
    throw new Error(
      "Invalid arguments: Height or weight must be greater than 0"
    );
  }

  return { height, weight };
};

if (typeof require !== "undefined" && require.main === module) {
  try {
    if (process.argv.length !== 4) {
      throw new Error(
        "Invalid arguments: npm run calculateBmi <height> <weight>"
      );
    }

    const { height, weight } = parseBmiArguments(
      process.argv[2],
      process.argv[3]
    );

    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    }
  }
}
