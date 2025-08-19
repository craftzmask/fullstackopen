const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.titl}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
