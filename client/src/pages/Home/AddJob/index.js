import "./style.css";
import { useState, useEffect } from "react";
import { FormItem } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import AllSystem from "../../../action/jobs";
import { Navigate, useNavigate } from "react-router-dom";

const AddJobPage = ({ id, setId }) => {
  const { auth, jobs } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    status: "",
    jobType: "",
  });

  useEffect(() => {
    if (id) {
      const singleJob = jobs.find((item) => item._id === id);
      setFormData({
        position: singleJob.position,
        company: singleJob.company,
        location: singleJob.location,
        status: singleJob.status,
        jobType: singleJob.jobType,
      });
    }
  }, [id]);

  const clearFormData = () => {
    setFormData({
      position: "",
      company: "",
      location: "",
      status: "",
      jobType: "",
    });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      dispatch(AllSystem("POST", auth?.token, formData));
    } else {
      dispatch(AllSystem("PUT", auth?.token, { ...formData, _id: id }));
      setId(null);
    }

    clearFormData();
    navigate("/all");
  };

  return (
    <div className="addjob-container">
      <div className="addjob-form">
        <h3>Add Job</h3>
        <form onSubmit={HandleSubmit}>
          <FormItem
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="position"
            label="Position"
            element="input"
          />
          <FormItem
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="company"
            label="Company"
            element="input"
          />
          <FormItem
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="location"
            label="Job Location"
            element="input"
          />
          <FormItem
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="status"
            label="Status"
            element="select"
            options={["pending", "interviews", "declined"]}
          />
          <FormItem
            value={formData.jobType}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="jobType"
            label="Job Type"
            element="select"
            options={["full-time", "part-time", "remote", "intership"]}
          />
          <button type="submit" className="filter-btn">
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
