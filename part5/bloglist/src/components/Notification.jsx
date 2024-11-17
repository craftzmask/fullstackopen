const Notification = ({ message, status }) => {
  if (message === '' || message === null) return

  return <div className={status}>{message}</div>
}

export default Notification