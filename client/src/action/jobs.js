import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

const AllSystem = (type, token, data) => async (dispatch) => {
  API.interceptors.request.use((req) => {
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  switch (type) {
    case "GET":
      dispatch({ type: "LOADING" });
      const getAllJobs = await API.get("/job");
      const responseGet = getAllJobs.data;
      dispatch({ type: "GET_JOBS", payload: responseGet });
      dispatch({ type: "CLOSE_LOADING" });
      break;

    case "POST":
      const postJob = await API.post("/job/create", data);
      const responsePost = postJob.data;
      dispatch({ type: "POST_JOB", payload: responsePost });
      break;

    case "DELETE":
      await API.delete(`/job/delete/${data}`);
      dispatch({ type: "DELETE_JOB", payload: data });
      break;

    case "PUT":
      const updatedJob = await API.put(`/job/update/${data?._id}`, data);
      const responseUpdate = updatedJob.data;
      console.log(responseUpdate);
      dispatch({ type: "UPDATE_JOB", payload: responseUpdate });
      break;

    default:
      return type;
  }
};

export const SearchHandler = (formData, token) => async (dispatch) => {
  API.interceptors.request.use((req) => {
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  try {
    dispatch({ type: "LOADING" });
    const { data } = await API.get(
      `/job/search?search=${formData.search}&status=${formData.status}&type=${formData.type}&sort=${formData.sort}`
    );
    dispatch({ type: "GET_JOBS", payload: data });
    dispatch({ type: "CLOSE_LOADING" });
  } catch (err) {
    console.log(err);
  }

  const searched = await API.get(
    `/job/search?search=${formData.search}&status=${formData.status}&type=${formData.type}&sort=${formData.sort}`
  );
  const { data } = searched;
  dispatch({ type: "GET_JOBS", payload: data });
};

export default AllSystem;
