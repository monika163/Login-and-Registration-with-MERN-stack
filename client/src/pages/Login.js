import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password
      };
      try {
        const response = await axios.post("/api/v1/login", formData);
        localStorage.setItem("auth", JSON.stringify(response.data.token));
        toast.success("Login successfull");
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={5}>
            <div className="login-main">
              <div className="login-right">
                <div className="login-right-container">
                  <div className="login-logo">
                    <img src={Logo} alt="" />
                  </div>
                  <div className="login-center">
                    <h2>Welcome back!</h2>
                    <p>Please enter your details</p>
                    <form onSubmit={handleLoginSubmit}>
                      <input type="email" placeholder="Email" name="email" />
                      <div className="pass-input-div">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="password"
                        />
                        {showPassword ? (
                          <FaEyeSlash
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          />
                        ) : (
                          <FaEye
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          />
                        )}
                      </div>

                      <div className="login-center-buttons">
                        <button type="submit">Log In</button>
                      </div>
                    </form>
                  </div>

                  <p className="login-bottom-p">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col> </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
