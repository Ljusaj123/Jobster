import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { showStats } from "../../utils/slices/allJobsSlice";
import customFetch from "../../utils/axios";
import { logoutUser } from "../../utils/slices/userSlice";

const Stats = () => {
  const dispatch = useDispatch();
  const { monthlyApplications } = useSelector((store) => store.allJobs);
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

        if (error.response.status === 401) {
          dispatch(logoutUser());
        }
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
