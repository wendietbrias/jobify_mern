import { BiTask } from "react-icons/bi";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { AiFillBug } from "react-icons/ai";

const Icon = ({ type }) => {
  if (type.toLowerCase() === "pending") {
    return <BiTask fontSize="1.8em" />;
  } else if (type.toLowerCase() === "interviews") {
    return <BsFillCalendarCheckFill fontSize="1.8em" />;
  }

  return <AiFillBug fontSize="1.8em" />;
};

const StatsCard = ({ data, variant, job }) => {
  return (
    <div className={`stats-card ${variant}`}>
      <div className={`top-stats  ${variant}`}>
        <h2>{job}</h2>
        <span className={`icon ${variant}`}>
          <Icon type={variant} />
        </span>
      </div>
      <h4>{data?.title}</h4>
    </div>
  );
};

export default StatsCard;
