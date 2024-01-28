import { useDispatch, useSelector } from "react-redux";
import AddJobWrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { useState } from "react";
import { toast } from "react-toastify";
import FormRowSelect from "../../components/FormRowSelect";
import { clearValues, handleChange } from "../../utils/jobSlice";

function AddJob() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const job = useSelector((state) => state.job);

  console.log(job);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!job.position || !job.company || !job.jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
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
