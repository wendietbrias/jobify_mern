const init = {
  isOpen: false,
  msg: "",
  variant: "",
  textVariant: "",
};

export default function AlertReducer(state = init, { type, payload }) {
  switch (type) {
    case "OPEN_ALERT":
      return {
        ...state,
        isOpen: true,
        msg: payload.msg,
        variant: payload.variant,
        textVariant: payload.textVariant,
      };
      break;

    case "CLOSE_ALERT":
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
}
