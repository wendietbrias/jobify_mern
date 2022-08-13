import "./style.css";
import { Logo } from "../../components";
import main from "../../assets/main.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LandingPage = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  return (
    <section className="container-landing-page">
      <div className="hero">
        <nav className="navigation">
          <Logo url="/landing" />
        </nav>
        <div className="banner">
          <div className="banner-text">
            <h1>
              Job <span>Tracking</span> App
            </h1>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
            <Link to="/auth">
              <button id="auth-btn">Login/Register</button>
            </Link>
          </div>
          <div className="banner-img">
            <img src={main} alt="main-banner-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
