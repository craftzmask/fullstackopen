import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, status } = useSelector((state) => state.notification)

  if (message === '' || message === null) return

  return <div className={status}>{message}</div>
}

export default Notification
