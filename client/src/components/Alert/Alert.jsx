import "./style.css";
import { useSelector, useDispatch } from "react-redux";

const Alert = () => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state);
  const { isOpen, msg, variant } = alert;

  const onClose = () => {
    dispatch({ type: "CLOSE_ALERT" });
  };

  return (
    <div className={`alert ${variant}`}>
      <span>{msg}</span>
      <button onClick={onClose} id="close">
        x
      </button>
    </div>
  );
};

export default Alert;
