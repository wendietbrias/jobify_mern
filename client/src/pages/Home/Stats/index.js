import "./style.css";
import { StatsCard } from "../../../components";
import { useSelector } from "react-redux";
import ChartData from "../../../components/Chart";

const StatsPage = () => {
  const jobs = useSelector((state) => state.jobs);

  return (
    <div className="stats-container">
      <div className="stats-cards">
        <StatsCard
          data={{ title: "Pending Application", count: 0 }}
          variant="pending"
          job={jobs.filter((item) => item.status === "pending").length}
        />
        <StatsCard
          data={{ title: "Interviews Scheduled", count: 0 }}
          variant="interviews"
          job={jobs.filter((item) => item.status === "interviews").length}
        />
        <StatsCard
          data={{ title: "Jobs Declined", count: 0 }}
          variant="declined"
          job={jobs.filter((item) => item.status === "declined").length}
        />
      </div>
      <div className="charts">
        <ChartData />
      </div>
    </div>
  );
};

export default StatsPage;
