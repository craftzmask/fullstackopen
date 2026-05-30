const PersonList = ({ persons }) => {
  return (
    <>
      {persons.map(({ id, name, number }) => (
        <div key={id}>
          {name} {number}
        </div>
      ))}
    </>
  );
};

export default PersonList;
