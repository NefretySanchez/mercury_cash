import "./styles/grid.scss";
import "./styles/form.scss";
import "./styles/styles.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import logo from "./img/fondo.jpg";
import { useNavigate } from "react-router-dom";

const SignUpView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [country, setCountry] = useState(0);
  const [language, setLanguage] = useState("english");
  const [accept_terms, setAcceptTerms] = useState(false);
  const [dataCountry, setDataCountry] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  let navigate = useNavigate();

  const onSubmitLogin = (e: any) => {
    if (country === 0) {
      alert("Debe escoger un pais");
    } else if (password !== repeatPassword) {
      alert("Las contraseñas deben ser las mismas");
    } else {
      const data = {
        email: email,
        password: password,
        repeatPassword: repeatPassword,
        country: country,
        language: language,
        accept_terms: accept_terms,
      };
      handleSaveToPC(data, "data");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    e.preventDefault();
  };

  const handleSaveToPC = (jsonData: any, filename: any) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${filename}.json`;
    link.href = url;
    link.click();
  };

  const onChangeEmail = (value: any) => {
    setEmail(value.target.value);
  };

  const onChangePassword = (value: any) => {
    setPassword(value.target.value);
  };

  const onChangeRepeatPassword = (value: any) => {
    setRepeatPassword(value.target.value);
  };

  const onChangeCountry = (value: any) => {
    setCountry(value.target.value);
  };

  const onChangeLanguage = (value: any) => {
    setLanguage(value.target.value);
  };

  const onChangeAcceptTerms = (value: any) => {
    setAcceptTerms(!accept_terms);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const listCountry = () => {
    axios
      .get("data/countries.json")
      .then((response) => {
        setDataCountry(response.data.data);
      })
      .catch(() => {
        alert("Error en redireccionar los usuarios");
      });
  };

  useEffect(() => {
    listCountry();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-center border-bottom">
        <div className="card card-sign-up mt-20">
          <div className="text-center">
            <img src={logo} alt="" style={{ width: "50%" }} />
          </div>

          <h2 className="form-title text-center">Create your account</h2>
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
                <button
                  type="button"
                  className="btn input-text"
                  onClick={togglePassword}
                >
                  <span>
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                </button>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  name="repeat_password"
                  value={repeatPassword}
                  required
                  onChange={onChangeRepeatPassword}
                  placeholder="Retype Password"
                />
                <button
                  type="button"
                  className="btn input-text"
                  onClick={toggleRepeatPassword}
                >
                  <span>
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                </button>
              </div>
            </div>
            <div className="form-group">
              <select
                name="country"
                onChange={onChangeCountry}
                value={country}
                required
              >
                <option value="0">Country of Residence</option>
                {dataCountry.length !== 0 &&
                  dataCountry.map((country) => {
                    return (
                      <option value={country.id}>{country.country}</option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group">
              <select
                name="language"
                onChange={onChangeLanguage}
                value={language}
                required
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
              </select>
            </div>
            <div className="form-group d-block">
              <input
                type="radio"
                name="accept_terms"
                onChange={onChangeAcceptTerms}
                required
              />
              <label>
                By continuing I agree to the <a href="#">Terms of Services</a>{" "}
                and <a href="#">Privacy Policy</a>
              </label>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-login"
                disabled={!email && !password && !repeatPassword}
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <p className="text-account">
          Have an account? <a href="/">Log In</a> instead.
        </p>
      </div>
    </div>
  );
};

export default SignUpView;
