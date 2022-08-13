import { combineReducers } from "redux";
import AuthReducer from "./auth";
import AlertReducer from "./alert";
import JobsReducer from "./jobs";
import LoadingReducer from "./loading";

export default combineReducers({
  auth: AuthReducer,
  jobs: JobsReducer,
  alert: AlertReducer,
  loading: LoadingReducer,
});
