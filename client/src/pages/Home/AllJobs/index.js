import "./style.css";
import { useState } from "react";
import { FormItem, Loading } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { FaLocationArrow } from "react-icons/fa";
import { RiShoppingBagFill } from "react-icons/ri";
import { BsFillCalendarMinusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AllSystem from "../../../action/jobs";
import { SearchHandler } from "../../../action/jobs";

const AllJobsPage = ({ setId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, auth, loading } = useSelector((state) => state);
  const [formData, setFormData] = useState({
    search: "",
    status: "",
    type: "",
    sort: "",
  });

  const HandleSubmit = (e) => {
    e.preventDefault();
  };

  const handleDelete = (id) => {
    dispatch(AllSystem("DELETE", auth?.token, id));
  };

  const HandleUpdate = (id) => {
    setId(id);
    navigate("/add");
  };

  const HandleSearch = () => {
    dispatch(SearchHandler(formData, auth?.token));
  };

  if (loading) {
    return <Loading />;
  }

  if (!jobs) {
    return (
      <div className="no-data">
        <h2>No Jobs to display</h2>
      </div>
    );
  }

  return (
    <div className="alljobs-container">
      <div className="alljobs-form">
        <h3>Search Jobs</h3>
        <form onSubmit={HandleSubmit}>
          <FormItem
            value={formData.search}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="search"
            label="Search"
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
            options={["all", "interview", "declined", "pending"]}
          />
          <FormItem
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="type"
            label="Type"
            element="select"
            options={["all", "full-time", "part-time", "intership", "remote"]}
          />
          <FormItem
            value={formData.sort}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="sort"
            label="Sort"
            element="select"
            options={["oldest", "latest", "a-z", "z-a"]}
          />
          <button className="clear-filters">Clear Filters</button>
          <button type="button" onClick={HandleSearch} className="filter-btn">
            Search
          </button>
        </form>
      </div>

      {Array.isArray(jobs) && jobs.length > 0 ? (
        <div className="jobs-data">
          {Array.isArray(jobs) &&
            jobs.length > 0 &&
            jobs.map((job, idx) => {
              return (
                <div key={idx} className="job-item">
                  <div className="company-information">
                    <span className="initial">
                      {job?.company.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <h4>{job?.company}</h4>
                      <h5>{job?.position}</h5>
                    </div>
                  </div>
                  <div className="main-information">
                    <span>
                      <FaLocationArrow fontSiz="1.2em" color="#627d98" />
                      <h5>{job?.location}</h5>
                    </span>
                    <span>
                      <RiShoppingBagFill fontSize="1.2em" color="#627d98" />
                      <h5>{job?.jobType}</h5>
                    </span>
                    <span>
                      <BsFillCalendarMinusFill
                        fontSize="1.2em"
                        color="#627d98"
                      />
                      <h5>{new Date(job?.createdAt).toDateString()}</h5>
                    </span>
                    <button className={`${job?.status}`}>{job?.status}</button>
                  </div>
                  <div className="btn-group">
                    <button
                      onClick={() => HandleUpdate(job?._id)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job?._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="no-data">
          <h2>No Jobs to display</h2>
        </div>
      )}
    </div>
  );
};

export default AllJobsPage;
