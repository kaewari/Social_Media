import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Profile.css";

function Profile() {
  return (
    <div className="d-flex justify-content-center">
      <div className="profile-page">
        <Form className="avatar">
          <img src="https://loremflickr.com/640/480/animals" alt="" />
          <Form.Group className="new-avatar">
            <Button type="submit">Change avatar</Button>
          </Form.Group>
        </Form>
        <Form className="info">
          <Form.Group>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <input
                type="text"
                required
                placeholder="Fill out your first name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <input
                type="text"
                required
                placeholder="Fill out your last name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <input
                type="text"
                readOnly={true}
                disabled={true}
                value={"sonhoang236"}
                placeholder="Fill out your username"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <input type="email" required placeholder="Fill out your email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <input
                type="text"
                maxLength={10}
                required
                placeholder="Fill out your phone number"
              />
            </Form.Group>
            <Form.Group className="new-info">
              <Button type="submit" className="btn btn-danger">
                Submit
              </Button>
            </Form.Group>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
