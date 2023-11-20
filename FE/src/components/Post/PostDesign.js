import moment from "moment";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

function PostDesign({ post, openModalHandler = null }) {
  const [comment, setComment] = useState("");
  const SendComment = (e) => {
    e.preventDefault();
    setComment("");
  };
  return (
    <Card className="post">
      <div className="m-2 p-2">
        <div className="d-flex">
          <img className="avatar" src={post.image} alt="" />

          <div className="d-flex flex-column">
            <span className="fw-bold ms-2">{post._id}</span>
            <span className="ms-2">{moment().startOf("hour").fromNow()}</span>
          </div>
        </div>
        <Card.Title>{post.content}</Card.Title>
        <Card.Title>This is content from post {post._id}</Card.Title>
      </div>
      <Card.Img src={post.image} />
      <Card.Body>
        <div className="d-flex justify-content-center">
          <div className="body d-flex justify-content-between">
            <Button>
              <i className="fa-solid fa-thumbs-up"></i>
              Like
            </Button>
            <Button onClick={openModalHandler}>
              <i className="fa-solid fa-comment"></i>
              Comment
            </Button>
            <Button>
              <i className="fa-solid fa-share"></i>
              Share
            </Button>
          </div>
        </div>
        <Form onSubmit={SendComment}>
          <div className="d-flex">
            <a href={post.image}>
              <img className="avatar" src={post.image} alt={post.title} />
            </a>
            <textarea
              id={post.id}
              className="comment rounded w-100 rounded-1 h-100"
              type="text"
              placeholder="Write your comment"
              value={comment}
              required={true}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PostDesign;
