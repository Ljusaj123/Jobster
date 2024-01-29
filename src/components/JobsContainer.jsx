import { useEffect, useState } from "react";
import Job from "./Job";
import JobsWrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import customFetch from "../utils/axios";
import { getJobs } from "../utils/allJobsSlice";
import { toast } from "react-toastify";
import PageBtnContainer from "./PageButtonContainer";

const JobsContainer = () => {
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
  const dispatch = useDispatch();

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
      } finally {
        setIsLoading(false);
      }
    };

    getAllJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, searchStatus, searchType, sort]);

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
      {numOfPages > 1 && <PageBtnContainer />}
    </JobsWrapper>
  );
};

export default JobsContainer;
