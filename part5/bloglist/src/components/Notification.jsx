const Notification = ({ message, status }) => {
  if (!message || message === "") {
    return null;
  }

  return <div className={status}>{message}</div>;
};

export default Notification;
