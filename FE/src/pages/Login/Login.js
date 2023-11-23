import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loginUser } from "../../helpers/authenticationHelpers";
import Register from "../Register/Register";
import "./Login.css";
function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await loginUser(username, password);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleShowRegister = () => {
    setShow(!show);
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
              <h5 className="pt-3 text-danger text-center fw-bold">{error}</h5>
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
                <Button onClick={handleShowRegister} variant="none">
                  Create new account
                </Button>
              </div>
            </Form.Group>
          </Form>
          <div className="message">
            <p className="p-4">
              <span className="fw-bold">Create a Page</span> for a celebrity,
              brand or business.
            </p>
          </div>
        </div>
      </div>
      {show && <Register handleShowRegister={handleShowRegister} />}
    </div>
  );
}

export default Login;
