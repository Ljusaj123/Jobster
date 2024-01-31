import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Job, Loading, PageButtonContainer } from ".";
import customFetch from "../utils/axios";
import { getJobs } from "../utils/allJobsSlice";
import { logoutUser } from "../utils/userSlice";
import JobsWrapper from "../assets/wrappers/JobsContainer";

const JobsContainer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    jobs,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);

  useEffect(() => {
    const getAllJobs = async () => {
      setIsLoading(true);
      let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      try {
        const response = await customFetch(url);

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

    getAllJobs();
  }, [dispatch, page, search, searchStatus, searchType, sort]);

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
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageButtonContainer />}
    </JobsWrapper>
  );
};

export default JobsContainer;
