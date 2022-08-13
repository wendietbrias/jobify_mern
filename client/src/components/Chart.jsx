import "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

const ChartData = ({ type }) => {
  const jobs = useSelector((state) => state.jobs);
  const pending = jobs.filter((item) => item.status === "pending");
  const interviews = jobs.filter((item) => item.status === "interviews");
  const declined = jobs.filter((item) => item.status === "declined");

  return (
    <div style={{ width: "100%", margin: "30px auto 0" }}>
      <Bar
        data={{
          labels: ["Pending", "Interviews", "Declined"],
          datasets: [
            {
              label: "Work data",
              data: [pending.length, interviews.length, declined.length],
              backgroundColor: [
                "rgb(233, 185, 73)",
                "rgb(100, 122, 203)",
                "rgb(214, 106, 106)",
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default ChartData;
