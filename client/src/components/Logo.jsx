import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Logo = ({ url }) => {
  return (
    <div>
      <Link to={`${url ? url : "/"}`}>
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
