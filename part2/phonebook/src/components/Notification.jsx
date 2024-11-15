const Notification = ({ message, status }) => {
  if (!message || message === '') return;

  return (
    <div className={status}>
      {message}
    </div>
  )
}

export default Notification