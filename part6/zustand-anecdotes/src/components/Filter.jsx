import { useAnecdoteActions } from "../store";

const Filter = () => {
  const { filter } = useAnecdoteActions();

  const handleChange = (e) => {
    filter(e.target.value);
  };

  return (
    <div style={{ marginBottom: 5 }}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
