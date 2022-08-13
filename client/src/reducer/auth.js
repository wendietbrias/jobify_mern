export default function AuthReducer(
  state = JSON.parse(localStorage.getItem("user")) || null,
  { type, payload }
) {
  switch (type) {
    case "AUTH":
      state = { user: payload.result, token: payload.token };
      localStorage.setItem("user", JSON.stringify(state));
      return state;
      break;

    case "LOGOUT":
      state = null;
      localStorage.setItem("user", JSON.stringify(state));
      return state;
      break;

    case "UPDATE":
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(state));
      return state;
      break;

    default:
      return state;
  }
}
