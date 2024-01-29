import { useEffect, useState } from "react";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../utils/allJobsSlice";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

const Stats = () => {
  const { monthlyApplications } = useSelector((store) => store.allJobs);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStats = async () => {
      setIsLoading(true);
      try {
        const resp = await customFetch.get("/jobs/stats");
        dispatch(showStats(resp.data));
      } catch (error) {
        const errorMessage =
          error?.response?.data?.msg || "please double check your credentials";

        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    getStats();

    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
