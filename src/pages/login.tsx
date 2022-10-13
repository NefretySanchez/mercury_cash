import "./styles/grid.scss";
import "./styles/form.scss";
import "./styles/styles.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import logo from "./img/fondo.jpg";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitLogin = (e: any) => {
    const data = {
      email: email,
      password: password,
    };

    alert(JSON.stringify(data));
    e.preventDefault();
  };

  const onChangeEmail = (value: any) => {
    setEmail(value.target.value);
  };

  const onChangePassword = (value: any) => {
    setPassword(value.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center border-bottom">
        <div className="card mt-20">
          <div className="text-center">
            <img src={logo} alt="" style={{ width: "50%" }} />
          </div>

          <h2 className="form-title text-center">Welcome Back</h2>
          <form onSubmit={onSubmitLogin}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={email}
                required
                onChange={onChangeEmail}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  required
                  onChange={onChangePassword}
                  placeholder="Password"
                />
                <button className="btn input-text" onClick={togglePassword}>
                  <span>
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                </button>
              </div>
              <div className="text-end">
                <a href="#">Forgot Password</a>
              </div>
            </div>
            <div className="form-group d-block">
              <input
                type="checkbox"
                name="remember_user"
                value={password}
                required
                onChange={onChangePassword}
              />
              <label>Remember me.</label>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-login"
                disabled={!email && !password}
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <p className="text-account">
          Don't have an account? <a href="/sign-up">Sign up</a> instead.
        </p>
      </div>
    </div>
  );
};

export default LoginView;
