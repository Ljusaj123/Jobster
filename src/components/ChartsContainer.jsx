import { useState } from "react";
import { useSelector } from "react-redux";
import { BarChart, AreaChart } from ".";
import ChartsWrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  return (
    <ChartsWrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </ChartsWrapper>
  );
};

export default ChartsContainer;
