const PersonList = ({ persons, onDelete }) => (
  <>
    {persons.map(p =>
      <div key={p.name}>
        {p.name} {p.number}
        <button onClick={() => onDelete(p)}>
          delete
        </button>
      </div>
    )}
  </>
)

export default PersonList