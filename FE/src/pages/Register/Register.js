import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Register.css";
const validateEmail = (email) => {
  const regrexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(regrexEmail) ? true : false;
};
const validatePhone = (phone) => {
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return phone.match(regexPhoneNumber) ? true : false;
};

function Register({ handleShowRegister }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const signUp = (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Passwords must be at least 8 characters.");
      return;
    }
    if (!validateEmail(emailOrPhone)) {
      if (!validatePhone(emailOrPhone)) {
        setError("Please enter a valid phone number or email address.");
        console.log(error);
        return;
      }
    }
    if (gender === "") {
      setError("Please choose a gender.");
      console.log(error);
      return;
    }
    console.log(
      firstName +
        " " +
        lastName +
        " " +
        emailOrPhone +
        " " +
        gender +
        " " +
        birth +
        " " +
        password
    );
  };
  return (
    <div className="register-page">
      <div className="modal-content">
        <div className="top">
          <div className="title">
            <h2 className="fw-bold">Sign Up</h2>
            <p className="opacity-75 m-0">It's not quick and easy.</p>
          </div>
          <div className="btn-close close" onClick={handleShowRegister}></div>
        </div>
        <hr className="m-1" />
        {error && <h5 className="text-danger text-center">{error}</h5>}
        <Form onSubmit={signUp}>
          <div className="name">
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
            />
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
            />
          </div>
          <div className="email">
            <input
              type="text"
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Phone number or email"
              required
            />
          </div>
          <div className="password">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
            />
          </div>
          <div className="birth">
            <label>Date of birth</label>
            <input
              type="date"
              onChange={(e) => setBirth(e.target.value)}
              required
            />
          </div>
          <div className="gender">
            <label htmlFor="gender">Gender</label>
            <div className="person">
              <label className="male">
                Male
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                />
              </label>
              <label className="female">
                Female
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                />
              </label>
              <label className="other">
                Other
                <input
                  type="radio"
                  value="other"
                  checked={gender === "other"}
                  onChange={handleGenderChange}
                />
              </label>
            </div>
          </div>
          <div className="text-center">
            <Button className="w-50 p-2 m-2" type="submit" variant="success">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
