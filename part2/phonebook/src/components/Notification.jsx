const Notification = ({ message }) => {
  if (message === null || message === "") {
    return;
  }

  return <div className="success">{message}</div>;
};

export default Notification;
