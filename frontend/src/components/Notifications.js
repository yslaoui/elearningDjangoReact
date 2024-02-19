const Notification = ({message, notificationtype}) => {
  if (message == null) {
    return null
  }
  else if (notificationtype) {
    return (
        <div className = "success">
             {message}
        </div>
      );
  }
  else if (!notificationtype) {
    return (
        <div className = "error">
             {message}
        </div>
      );
  }
}

export default Notification
