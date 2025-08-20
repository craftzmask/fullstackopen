const calculateBmi = (height: number, weight: number): string => {
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

try {
  if (process.argv.length !== 4) {
    throw new Error(
      "Invalid arguments: npm run calculateBmi <height> <weight>"
    );
  }

  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  if (!Number.isFinite(height) || !Number.isFinite(weight)) {
    throw new Error("Invalid arguments: Height or weight must be a number");
  }

  if (!(height > 0 && weight > 0)) {
    throw new Error(
      "Invalid arguments: Height or weight must be greater than 0"
    );
  }

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
