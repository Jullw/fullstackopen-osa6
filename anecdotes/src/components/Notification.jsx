import { useNotificationValues } from "../store";

const Notification = () => {
  const { show, text } = useNotificationValues();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <>
      {show && (
        <div style={style} data-testid="notification">
          {text}
        </div>
      )}
    </>
  );
};

export default Notification;
