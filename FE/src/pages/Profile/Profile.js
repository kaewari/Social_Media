import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Profile.css";

function Profile() {
  const imageRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    return () => {
      previewImage && URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);
  const handleAvatarChange = (e) => {
    e.preventDefault();
  };
  const handleImageClick = () => {
    imageRef.current.click();
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewImage(previewURL);
      console.log(previewURL);
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="profile-page">
        <Form onSubmit={handleAvatarChange} className="avatar">
          <img
            onClick={handleImageClick}
            src={previewImage || "https://loremflickr.com/640/480/animals"}
            alt="https://loremflickr.com/640/480/animals"
          />
          <input
            type="file"
            ref={imageRef}
            className="d-none"
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png, .gif, .svg, .ico, .jfif, .webp"
          />
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
