import PropTypes from 'prop-types'

const Notification = ({ message, status }) => {
  if (message === '' || message === null) return

  return <div className={status}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}

export default Notification