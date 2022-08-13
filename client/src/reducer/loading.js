export default function LoadingReducer(state = false, { type, payload }) {
  if (type === "LOADING") {
    state = true;
  } else {
    state = false;
  }

  return state;
}
