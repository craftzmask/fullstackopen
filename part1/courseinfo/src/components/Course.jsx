const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Total = ({ parts }) => {
  let total = parts
    .reduce((sum, part) => sum + part.exercises, 0)

  return (
    <strong>total of {total} exercises</strong>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course