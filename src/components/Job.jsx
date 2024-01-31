import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { JobInfo } from ".";
import customFetch from "../utils/axios";
import { getJobs } from "../utils/allJobsSlice";
import { setEditJob } from "../utils/jobSlice";
import { logoutUser } from "../utils/userSlice";
import JobWrapper from "../assets/wrappers/Job";

const Job = ({
  setIsLoading,
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();
  const date = moment(createdAt).format("MMM Do, YYYY");

  const deleteJob = async () => {
    try {
      await customFetch.delete(`/jobs/${_id}`);
      toast.success("job deleted");
      getAllJobs();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg || "please double check your credentials";

      toast.error(errorMessage);
      if (error.response.status === 401) {
        dispatch(logoutUser());
      }
    }
  };

  const getAllJobs = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch("/jobs");

      dispatch(getJobs(response.data));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg || "please double check your credentials";

      toast.error(errorMessage);
      if (error.response.status === 401) {
        dispatch(logoutUser());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const editJob = () => {
    dispatch(
      setEditJob({
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      })
    );
  };

  return (
    <JobWrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => {
                editJob();
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                deleteJob();
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </JobWrapper>
  );
};

export default Job;
