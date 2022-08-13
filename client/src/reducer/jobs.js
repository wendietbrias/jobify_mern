export default function JobsReducer(state = [], { type, payload }) {
  switch (type) {
    case "GET_JOBS":
      state = payload;
      return state;
      break;

    case "POST_JOB":
      state = [...state, payload];
      return state;
      break;

    case "DELETE_JOB":
      const filterData = state.filter((item, idx) =>
        item?._id !== payload ? item : ""
      );
      state = filterData;
      return state;
      break;

    case "UPDATE_JOB":
      const updated = state.map((item, idx) =>
        item._id === payload?._id ? payload : item
      );
      state = updated;
      return state;
      break;

    default:
      return state;
  }
}
