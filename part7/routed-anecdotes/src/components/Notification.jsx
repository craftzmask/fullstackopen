const Notification = ({ message }) => {
  const blogStyle={
    padding: 5,
    marginBottom: 10,
    border: '1px solid black'
  }

  if (!message) return

  return (
    <div style={blogStyle}>
      {message}
    </div>
  )
}

export default Notification