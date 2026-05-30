const Notification = ({ message, type }) => {
  if (message === null || message === "") {
    return;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
