import { IoIosStats } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { VscNotebookTemplate } from "react-icons/vsc";
import { RiShieldUserLine } from "react-icons/ri";

const LinkItems = [
  {
    title: "Stats",
    url: "/",
    icon: <IoIosStats fontSize="1.6em" style={{ marginRight: "15px" }} />,
  },
  {
    title: "All Job",
    url: "/all",
    icon: <TbReportSearch fontSize="1.6em" style={{ marginRight: "15px" }} />,
  },
  {
    title: "Add Job",
    url: "/add",
    icon: (
      <VscNotebookTemplate fontSize="1.6em" style={{ marginRight: "15px" }} />
    ),
  },
  {
    title: "Profile",
    url: "/profile",
    icon: <RiShieldUserLine fontSize="1.6em" style={{ marginRight: "15px" }} />,
  },
];

export default LinkItems;
