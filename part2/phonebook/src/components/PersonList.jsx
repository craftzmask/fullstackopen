const PersonList = ({ persons }) => (
  <>
    {persons.map(p =>
      <div key={p.name}>{p.name} {p.number}</div>
    )}
  </>
)

export default PersonList