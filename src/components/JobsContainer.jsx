import { useEffect, useState } from "react";
import Job from "./Job";
import JobsWrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import customFetch from "../utils/axios";
import { getJobs } from "../utils/allJobsSlice";
import { toast } from "react-toastify";

const JobsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { jobs } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllJobs = async () => {
      setIsLoading(true);
      try {
        const response = await customFetch("/jobs");

        dispatch(getJobs(response.data));
      } catch (error) {
        const errorMessage =
          error?.response?.data?.msg || "please double check your credentials";

        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    getAllJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <JobsWrapper>
        <h2>No jobs to display...</h2>
      </JobsWrapper>
    );
  }

  return (
    <JobsWrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} setIsLoading={setIsLoading} {...job} />;
        })}
      </div>
    </JobsWrapper>
  );
};

export default JobsContainer;
