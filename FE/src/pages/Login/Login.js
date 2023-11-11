import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import { authApi, endpoint } from "../../apis/Apis";
import Register from "../Register/Register";
function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      if (password.length < 5) {
        setError("Passwords must be at least 8 characters.");
        console.log(error);
        return;
      }
      if (username.length < 5 || username.length > 20) {
        console.log(username.length);
        setError("Username must be between 5-10 characters.");
        console.log(error);
        return;
      }
      await authApi()
        .post(endpoint["login"], {
          user_username: username,
          user_password: password,
        })
        .then((res) => {
          document.cookie = `accessToken = ${res.data.accessToken};secure`;
          document.cookie = `refreshToken = ${res.data.refreshToken};secure`;
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCreateAccount = (msg) => {
    if (msg === false) setShow(msg);
    else {
      setShow(!show);
    }
    if (!show) {
      document.getElementsByClassName("login-page").item(0).style.opacity = 0.6;
      document
        .getElementsByClassName("login-page")
        .item(0).style.pointerEvents = "none";
    } else {
      document.getElementsByClassName("login-page").item(0).style.opacity = 1;
      document
        .getElementsByClassName("login-page")
        .item(0).style.pointerEvents = "auto";
    }
  };

  return (
    <div className="page">
      <div className="login-page">
        <div className="left">
          <p className="text-primary fw-bold">Login</p>
          <h2 className="fw-normal">
            We helps you connect and share with the people in your life.
          </h2>
        </div>
        <div className="right">
          <Form
            onSubmit={handleLogin}
            className="bg-white border shadow rounded-3"
          >
            {error && (
              <p className="pt-3 text-danger text-center fw-bold">{error}</p>
            )}
            <Form.Group className="pt-3 ps-3 pe-3">
              <input
                name="user_username"
                onChange={(e) => setusername(e.target.value)}
                className="form-control p-2 fs-5"
                placeholder="Nhập số điện thoại hoặc email"
                type="text"
              />
            </Form.Group>
            <Form.Group className="pt-3 ps-3 pe-3">
              <input
                name="user_password"
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 fs-5"
                placeholder="Nhập mật khẩu"
                type="password"
              />
            </Form.Group>
            <Form.Group className="p-3">
              <Button type="submit" className="w-100 p-1 fw-bold fs-4">
                Log in
              </Button>
            </Form.Group>
            <Form.Group className="text-center">
              <Link to={"#"}>Forgotten password?</Link>
            </Form.Group>
            <hr className="m-3" />
            <Form.Group className="new-account m-4">
              <div className="rounded-2 fs-6 fw-bold">
                <Button onClick={handleCreateAccount} variant="none">
                  Create new account
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
      {show && <Register handleCreateAccount={handleCreateAccount} />}
    </div>
  );
}

export default Login;
