import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FormRow, FormRowSelect } from "../../components";

import { clearValues, handleChange } from "../../utils/slices/jobSlice";
import customFetch from "../../utils/axios";
import { logoutUser } from "../../utils/slices/userSlice";
import AddJobWrapper from "../../assets/wrappers/DashboardFormPage";

function AddJob() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const job = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!job.isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!job.position || !job.company || !job.jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    if (job.isEditing) {
      updateJob();
    } else {
      createJob();
    }
  };

  const updateJob = async () => {
    const { editJobId, position, company, jobLocation, jobType, status } = job;
    try {
      const body = {
        editJobId,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
      await customFetch.patch(`/jobs/${job.editJobId}`, body);

      toast.success("job updated successfully");
      dispatch(clearValues());
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

  const createJob = async () => {
    setIsLoading(true);
    const body = {
      position: job.position,
      company: job.company,
      jobLocation: job.jobLocation,
      jobType: job.jobType,
      status: job.status,
    };

    try {
      await customFetch.post("/jobs", body);

      toast.success("job created successfully");
      dispatch(clearValues());
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
  const handleJobChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  return (
    <AddJobWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{job.isEditing ? "edit job" : "add job"}</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={job.position}
            handleChange={handleJobChange}
          />
          <FormRow
            type="text"
            name="company"
            value={job.company}
            handleChange={handleJobChange}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={job.jobLocation}
            handleChange={handleJobChange}
          />
          <FormRowSelect
            type="text"
            name="status"
            labelText="status"
            value={job.status}
            list={job.statusOptions}
            handleChange={handleJobChange}
          />
          <FormRowSelect
            type="text"
            name="jobType"
            labelText="job type"
            value={job.jobType}
            list={job.jobTypeOptions}
            handleChange={handleJobChange}
          />
          <div className="btn-container">
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "submit"}
            </button>
          </div>
        </div>
      </form>
    </AddJobWrapper>
  );
}

export default AddJob;
