// NotFound.js
import React from "react";
import "./NotFound.css"; // Import your stylesheet
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">404 Not Found</h2>
      <p className="not-found-message">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to={"/"}>Back to home</Link>
    </div>
  );
};

export default NotFound;
