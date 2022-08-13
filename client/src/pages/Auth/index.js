import "./style.css";
import { Logo, Alert } from "../../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUpHandler, SignInHandler } from "../../action/auth";
import { useEffect } from "react";

const AuthPage = () => {
  const {
    alert: { isOpen },
    auth,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (formData.password !== formData.confirm) {
        dispatch({
          type: "OPEN_ALERT",
          payload: {
            msg: "Password is not match",
            variant: "danger",
          },
        });
      }

      return dispatch(
        SignUpHandler(navigate, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      );
    }

    dispatch(
      SignInHandler(
        { email: formData.email, password: formData.password },
        navigate
      )
    );
  };

  return (
    <section className="container-auth-page">
      <div className="auth-section">
        {isOpen ? <Alert /> : null}
        <Logo />
        <h3>{isSignUp ? "Register" : "Login"}</h3>
        <form onSubmit={handleSubmit} className="form-section">
          {isSignUp ? (
            <div className="form-control">
              <label>Name</label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
                type="text"
              />
            </div>
          ) : null}
          <div className="form-control">
            <label>Email</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              type="email"
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              type="password"
            />
          </div>
          {isSignUp ? (
            <div className="form-control">
              <label>Confirm</label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, confirm: e.target.value })
                }
                value={formData.confirm}
                type="password"
              />
            </div>
          ) : null}
          <button type="submit">{isSignUp ? "Register" : "Login"}</button>
          <h5 onClick={handleSwitch}>
            {isSignUp ? "Don't have account" : "Already have account"}
            <span>{isSignUp ? "Login" : "Register"}</span>
          </h5>
        </form>
      </div>
    </section>
  );
};

export default AuthPage;
