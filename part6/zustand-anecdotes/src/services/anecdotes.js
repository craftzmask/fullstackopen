const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await response.json();
};

const add = async (anecdote) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anecdote),
  });

  if (!response.ok) {
    throw new Error(`Failed to create a new anecdote ${anecdote}`);
  }

  return await response.json();
};

export default { getAll, add };
