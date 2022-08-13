import axios from "axios";

function DisplayAlert(dispatch, type, variant, msg) {
  return dispatch({
    type: type,
    payload: {
      msg: msg,
      variant: variant,
    },
  });
}

export const SignUpHandler = (navigate, formData) => async (dispatch) => {
  try {
    DisplayAlert(
      dispatch,
      "OPEN_ALERT",
      "success",
      "User created! Redirecting..."
    );
    const createUser = await axios.post(
      `http://localhost:8000/auth/signup`,
      formData
    );
    const { data } = createUser;
    if (data) {
      dispatch({ type: "AUTH", payload: data });
      window.location.href = "/";
    }

    dispatch({ type: "CLOSE_ALERT" });
  } catch (err) {
    const {
      response: { data },
    } = err;
    DisplayAlert(dispatch, "CLOSE_ALERT", "danger", data.msg);
  }
};

export const SignInHandler = (formData, navigate) => async (dispatch) => {
  try {
    DisplayAlert(dispatch, "OPEN_ALERT", "success", "Redirecting User...");
    const { data } = await axios.post(
      `http://localhost:8000/auth/signin`,
      formData
    );
    if (data) {
      dispatch({ type: "AUTH", payload: data });
      window.location.href = "/";
    }
    dispatch({ type: "CLOSE_ALERT" });
  } catch (err) {
    const {
      response: { data },
    } = err;
    DisplayAlert(dispatch, "OPEN_ALERT", "danger", data.msg);
  }
};

export const UpdateUserData = (formData, token) => async (dispatch) => {
  axios.interceptors.request.use((req) => {
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  try {
    const { data } = await axios.patch(
      `http://localhost:8000/auth/update/${formData._id}`,
      formData
    );

    dispatch({ type: "UPDATE", payload: data });
  } catch (err) {
    const {
      response: { data },
    } = err;
    DisplayAlert(dispatch, "OPEN_ALERT", "danger", data.msg);
  }
};
