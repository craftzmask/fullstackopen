import { type CoursePart } from "../types";

const asssertNever = (v: never) => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div style={{ marginBottom: 10 }}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <div>description: {part.description}</div>
        </div>
      );
    case "group":
      return (
        <div style={{ marginBottom: 10 }}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <div>groups count: {part.groupProjectCount}</div>
        </div>
      );
    case "background":
      return (
        <div style={{ marginBottom: 10 }}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <div>description: {part.description}</div>
          <div>submit: {part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div style={{ marginBottom: 10 }}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <div>description: {part.description}</div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return asssertNever(part);
  }
};

export default Part;
